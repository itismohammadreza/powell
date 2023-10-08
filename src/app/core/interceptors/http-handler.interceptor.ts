import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {finalize, identity, of, tap, throwError, timeout} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OverlayService} from '@powell/api';
import {AuthService} from '@core/http';
import {appConfig, RequestsConfig} from "@core/config";
import {LoaderService} from "@core/utils";
import {RequestConfig} from "@core/models";

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {
  requestsQueue: HttpRequest<any>[] = [];
  cachedRequests = new Map<string, any>();
  loadingRequestsCounter = new Map<string, number>();

  constructor(private overlayService: OverlayService,
              private loaderService: LoaderService,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const clonedReq = request.clone();
    const shouldCatch = this.getRequestProp(request, null, 'catch');
    const shouldLoading = this.getRequestProp(request, null, 'loading');

    if (shouldCatch) {
      const cachedResponse = this.cachedRequests.get(request.url);
      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    if (shouldLoading) {
      const pathTemplate = this.getRequestProp(request, null, 'pathTemplate');
      const loadingOnlyOnce = this.getRequestProp(request, null, 'loadingOnlyOnce');
      this.loadingRequestsCounter.set(pathTemplate, (this.loadingRequestsCounter.get(pathTemplate) ?? 0) + 1);
      if (!loadingOnlyOnce || (loadingOnlyOnce && this.loadingRequestsCounter.get(pathTemplate) == 1)) {
        this.requestsQueue.push(clonedReq);
        this.loaderService.setLoadingState(true);
      }
    }

    return next.handle(clonedReq).pipe(
      this.handleTimeout(request),
      tap((response: any) => {
        const successMessage = this.getRequestProp(request, response, 'successMessage');
        if (!(response instanceof HttpResponse) || /2\d+/.test(response.status.toString()) == false) {
          return;
        }
        if (![false, undefined].includes(successMessage)) {
          this.showSuccessToast(successMessage ?? response.body.message)
        }
        if (shouldCatch) {
          this.cachedRequests.set(request.url, response);
        }
        this.removeRequestFromQueue(clonedReq);
      }),
      catchError((httpError: HttpErrorResponse) => {
        const failureMessage = this.getRequestProp(request, httpError, 'failureMessage');
        if (![false, undefined].includes(failureMessage)) {
          const {error_description} = httpError.error;
          this.showFailureToast(failureMessage ?? error_description);
        }
        if (httpError.status === 403) {
          this.authService.logout();
        }
        this.removeRequestFromQueue(clonedReq);
        return throwError(() => httpError);
      }),
      finalize(() => {
        this.removeRequestFromQueue(clonedReq);
      }),
    );
  }

  showSuccessToast(message: string) {
    this.overlayService.showToast({
      severity: 'success',
      detail: message ?? 'با موفقیت انجام شد'
    });
  }

  showFailureToast(message: string) {
    this.overlayService.showToast({
      severity: 'error',
      detail: message ?? 'خطایی رخ داده است'
    });
  }

  getRequestConfig(request: HttpRequest<any>) {
    const {pathname} = this.getUrlParts(request.url);
    const requestPathMatch = ({pathTemplate, isCustomApi}: RequestConfig) => {
      const testCase = isCustomApi ? request.urlWithParams : pathname;
      if (pathTemplate instanceof RegExp) {
        return pathTemplate.test(testCase);
      } else if (pathTemplate.includes('*')) {
        const rep1 = pathTemplate.replace(/\*/g, '.*');
        const rep2 = rep1.replace(/\//g, "\\\/");
        const regex = new RegExp(rep2, 'g');
        return regex.test(testCase);
      } else {
        return pathTemplate == testCase;
      }
    }
    const idx = RequestsConfig.findIndex(config => {
      const requestMethodMatch = config.method === request.method;
      return requestMethodMatch && requestPathMatch(config);
    });
    return RequestsConfig[idx];
  }

  getUrlParts(url: string) {
    const linkElement = document.createElement('a');
    const res: any = {};
    linkElement.href = url;
    ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'].forEach((k) => {
      res[k] = linkElement[k];
    });
    linkElement.remove();
    return res;
  }

  removeRequestFromQueue(request: HttpRequest<any>) {
    const i = this.requestsQueue.indexOf(request);
    if (i >= 0) {
      this.requestsQueue.splice(i, 1);
    }
    this.loaderService.setLoadingState(this.requestsQueue.length > 0);
  }

  getRequestProp(request: HttpRequest<any>, response: HttpResponseBase, prop: keyof RequestConfig) {
    const requestConfig: any = this.getRequestConfig(request);
    if (!requestConfig) {
      return false;
    }
    if (typeof requestConfig[prop] === 'function') {
      return requestConfig[prop](request, response);
    } else {
      return requestConfig[prop];
    }
  }

  handleTimeout(request: HttpRequest<any>) {
    const getQueryTimeout = (url: string) => {
      if (!url.includes('http')) {
        return 'none';
      }
      const requestSearchParams = new URL(url).search;
      return new URLSearchParams(requestSearchParams).get('timeout');
    }
    let configTimeout = this.getRequestProp(request, null, 'timeout');
    let queryTimeout = getQueryTimeout(request.url);
    if (configTimeout == 'none' || queryTimeout == 'none') {
      return identity;
    } else {
      return timeout(+queryTimeout || configTimeout || appConfig.requestTimeout);
    }
  }
}

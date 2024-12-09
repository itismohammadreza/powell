import {inject} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {finalize, identity, of, tap, throwError, timeout} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OverlayService} from '@powell/api';
import {AuthService} from '@core/http';
import {globalConfig, RequestsConfig} from "@core/config";
import {LoaderService} from "@core/utils";
import {RequestConfig} from "@core/models";

export const httpHandlerInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const overlayService = inject(OverlayService);
  const loaderService = inject(LoaderService);
  const authService = inject(AuthService);

  const showSuccessToast = (message: string) => {
    overlayService.showToast({
      severity: 'success',
      detail: message ?? 'با موفقیت انجام شد'
    });
  }

  const showFailureToast = (message: string) => {
    overlayService.showToast({
      severity: 'error',
      detail: message ?? 'خطایی رخ داده است'
    });
  }

  const getRequestConfig = (request: HttpRequest<any>) => {
    const {pathname} = getUrlParts(request.url);
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

  const getUrlParts = (url: string) => {
    const linkElement = document.createElement('a');
    const res: any = {};
    linkElement.href = url;
    ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'].forEach((k) => {
      res[k] = linkElement[k];
    });
    linkElement.remove();
    return res;
  }

  const removeRequestFromQueue = (request: HttpRequest<any>) => {
    const i = requestsQueue.indexOf(request);
    if (i >= 0) {
      requestsQueue.splice(i, 1);
    }
    loaderService.setLoadingState(requestsQueue.length > 0);
  }

  const getRequestProp = (request: HttpRequest<any>, response: HttpResponseBase, prop: keyof RequestConfig) => {
    const requestConfig: any = getRequestConfig(request);
    if (!requestConfig) {
      return false;
    }
    if (typeof requestConfig[prop] === 'function') {
      return requestConfig[prop](request, response);
    } else {
      return requestConfig[prop];
    }
  }

  const handleTimeout = (request: HttpRequest<any>) => {
    const getQueryTimeout = (url: string) => {
      if (!url.includes('http')) {
        return 'none';
      }
      const requestSearchParams = new URL(url).search;
      return new URLSearchParams(requestSearchParams).get('timeout');
    }
    let configTimeout = getRequestProp(request, null, 'timeout');
    let queryTimeout = getQueryTimeout(request.url);
    if (configTimeout == 'none' || queryTimeout == 'none') {
      return identity;
    } else {
      return timeout(+queryTimeout || configTimeout || globalConfig.requestTimeout);
    }
  }

  const requestsQueue: HttpRequest<any>[] = [];
  const cachedRequests = new Map<string, any>();
  const loadingRequestsCounter = new Map<string, number>();

  const clonedReq = request.clone();
  const shouldCatch = getRequestProp(request, null, 'catch');
  const shouldLoading = getRequestProp(request, null, 'loading');

  if (shouldCatch) {
    const cachedResponse = cachedRequests.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  if (shouldLoading) {
    const pathTemplate = getRequestProp(request, null, 'pathTemplate');
    const loadingOnlyOnce = getRequestProp(request, null, 'loadingOnlyOnce');
    loadingRequestsCounter.set(pathTemplate, (loadingRequestsCounter.get(pathTemplate) ?? 0) + 1);
    if (!loadingOnlyOnce || (loadingOnlyOnce && loadingRequestsCounter.get(pathTemplate) == 1)) {
      requestsQueue.push(clonedReq);
      loaderService.setLoadingState(true);
    }
  }

  return next(clonedReq).pipe(
    handleTimeout(request),
    tap((response: any) => {
      const successMessage = getRequestProp(request, response, 'successMessage');
      if (!(response instanceof HttpResponse) || /2\d+/.test(response.status.toString()) == false) {
        return;
      }
      if (![false, undefined].includes(successMessage)) {
        showSuccessToast(successMessage ?? response.body.message)
      }
      if (shouldCatch) {
        cachedRequests.set(request.url, response);
      }
      removeRequestFromQueue(clonedReq);
    }),
    catchError((httpError: HttpErrorResponse) => {
      const failureMessage = getRequestProp(request, httpError, 'failureMessage');
      if (![false, undefined].includes(failureMessage)) {
        const {error_description} = httpError.error;
        showFailureToast(failureMessage ?? error_description);
      }
      if (httpError.status === 403) {
        authService.logout();
      }
      removeRequestFromQueue(clonedReq);
      return throwError(() => httpError);
    }),
    finalize(() => {
      removeRequestFromQueue(clonedReq);
    }),
  );
}

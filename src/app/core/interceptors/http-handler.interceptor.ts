import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,} from '@angular/common/http';
import {finalize, of, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OverlayService} from '@powell/api';
import {AuthService} from '@core/http';
import {RequestsConfig} from "@core/config";
import {LoaderService} from "@core/utils";

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {
  requestsQueue: HttpRequest<any>[] = [];
  cachedRequests = new Map<string, any>();

  constructor(private overlayService: OverlayService,
              private loaderService: LoaderService,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const clonedReq = request.clone();
    const shouldCatch = this.getRequestProp(request, 'catch');
    const shouldLoading = this.getRequestProp(request, 'loading');
    const successMessage = this.getRequestProp(request, 'successMessage');
    const failureMessage = this.getRequestProp(request, 'failureMessage');

    if (shouldCatch) {
      const cachedResponse = this.cachedRequests.get(request.url);
      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    if (shouldLoading) {
      this.requestsQueue.push(clonedReq);
      this.loaderService.setLoadingState(true);
    }

    return next.handle(clonedReq).pipe(
      tap((event: any) => {
        if (!(event instanceof HttpResponse) || /2\d+/.test(event.status.toString()) == false) {
          return;
        }
        if (![false, undefined].includes(successMessage)) {
          this.showSuccessToast(successMessage ?? event.body.message)
        }
        if (shouldCatch) {
          this.cachedRequests.set(request.url, event);
        }
        this.removeRequestFromQueue(clonedReq);
      }),
      catchError((event: HttpErrorResponse) => {
        if (![false, undefined].includes(failureMessage)) {
          const {error_description} = event.error;
          this.showFailureToast(failureMessage ?? error_description);
        }
        if (event.status === 403) {
          this.authService.logout();
        }
        this.removeRequestFromQueue(clonedReq);
        return throwError(() => event);
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
    const idx = RequestsConfig.findIndex(x => {
      const requestMethodMatch = x.method === request.method;
      const requestPathMatch = () => {
        if (x.pathTemplate instanceof RegExp) {
          return x.pathTemplate.test(pathname);
        } else if (x.pathTemplate.includes('*')) {
          const rep1 = x.pathTemplate.replace(/\*/g, '.*')
          const rep2 = rep1.replace(/\//g, "\\\/");
          const regex = new RegExp(rep2, 'g');
          return regex.test(pathname);
        } else {
          return x.pathTemplate == pathname
        }
      }
      return requestMethodMatch && requestPathMatch();
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

  getRequestProp(request: HttpRequest<any>, prop: 'successMessage' | 'failureMessage' | 'catch' | 'loading') {
    const requestConfig: any = this.getRequestConfig(request);
    if (!requestConfig) {
      return false;
    }
    if (typeof requestConfig[prop] === 'function') {
      return requestConfig[prop](request);
    } else {
      return requestConfig[prop];
    }
  }
}

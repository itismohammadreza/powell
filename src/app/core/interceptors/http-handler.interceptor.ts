import {inject} from '@angular/core';
import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse,} from '@angular/common/http';
import {finalize, identity, of, tap, throwError, timeout} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OverlayService} from '@powell/api';
import {AuthService} from '@core/http';
import {globalConfig} from "@core/config";
import {LoaderService} from "@core/utils";
import {httpUtils} from '@core/interceptors/http-utils';

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

  const removeRequestFromQueue = (request: HttpRequest<SafeAny>) => {
    const i = requestsQueue.indexOf(request);
    if (i >= 0) {
      requestsQueue.splice(i, 1);
    }
    loaderService.setLoadingState(requestsQueue.length > 0);
  }

  const handleTimeout = (request: HttpRequest<SafeAny>) => {
    const getQueryTimeout = (url: string) => {
      if (!url.includes('http')) {
        return 'none';
      }
      const requestSearchParams = new URL(url).search;
      return new URLSearchParams(requestSearchParams).get('timeout');
    }
    let configTimeout = httpUtils.getRequestProp(request, undefined, 'timeout');
    let queryTimeout = getQueryTimeout(request.url)!;
    if (configTimeout == 'none' || queryTimeout == 'none') {
      return identity;
    } else {
      return timeout(+queryTimeout || configTimeout || globalConfig.requestTimeout);
    }
  }

  const requestsQueue: HttpRequest<SafeAny>[] = [];
  const cachedRequests = new Map<string, SafeAny>();
  const loadingRequestsCounter = new Map<string, number>();

  const clonedReq = request.clone();
  const shouldCatch = httpUtils.getRequestProp(request, undefined, 'catch');
  const shouldLoading = httpUtils.getRequestProp(request, undefined, 'loading');
  const shouldSkip = httpUtils.getRequestProp(request, undefined, 'skipInterceptor');

  if (shouldSkip) {
    return next(clonedReq);
  }

  if (shouldCatch) {
    const cachedResponse = cachedRequests.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  if (shouldLoading) {
    const pathTemplate = httpUtils.getRequestProp(request, undefined, 'pathTemplate');
    const loadingOnlyOnce = httpUtils.getRequestProp(request, undefined, 'loadingOnlyOnce');
    loadingRequestsCounter.set(pathTemplate, (loadingRequestsCounter.get(pathTemplate) ?? 0) + 1);
    if (!loadingOnlyOnce || (loadingOnlyOnce && loadingRequestsCounter.get(pathTemplate) == 1)) {
      requestsQueue.push(clonedReq);
      loaderService.setLoadingState(true);
    }
  }

  return next(clonedReq).pipe(
    handleTimeout(request),
    tap((response: SafeAny) => {
      const successMessage = httpUtils.getRequestProp(request, response, 'successMessage');
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
      const failureMessage = httpUtils.getRequestProp(request, httpError, 'failureMessage');
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

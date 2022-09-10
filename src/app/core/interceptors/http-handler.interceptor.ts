import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {finalize, Observable, of, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OverlayService} from '@ng/services';
import {AuthService} from '@core/http';
import {RequestConfig, RequestsConfig} from "@core/requests.config";
import {LoaderService} from "@core/utils";

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {
  constructor(private overlayService: OverlayService,
              private loaderService: LoaderService,
              private authService: AuthService) {
  }

  requestsQueue: HttpRequest<any>[] = [];
  hasSuccessMessageApis = RequestsConfig.filter(r => r.success);
  hasFailureMessageApis = RequestsConfig.filter(r => r.failure);
  hasLoadingApis = RequestsConfig.filter(r => r.loading);
  catchEnabledApis = RequestsConfig.filter(r => r.catch);
  cachedRequests = new Map<string, any>();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = request.clone();
    const shouldShowSuccess = this.findRequestByPath(this.hasSuccessMessageApis, request);
    const shouldShowFailure = this.findRequestByPath(this.hasFailureMessageApis, request);
    const shouldShowLoading = this.findRequestByPath(this.hasLoadingApis, request)
    const shouldCatch = this.findRequestByPath(this.catchEnabledApis, request);

    if (shouldCatch) {
      const cachedResponse = this.cachedRequests.get(request.url);
      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    if (shouldShowLoading) {
      this.requestsQueue.push(clonedReq);
      this.loaderService.isLoading.next(true);
    }

    return next.handle(clonedReq).pipe(
      tap((event: any) => {
        if (!(event instanceof HttpResponse) || /2\d+/.test(event.status.toString()) == false) {
          return;
        }
        if (shouldShowSuccess) {
          this.showSuccessToast('', event.body.message)
        }
        if (shouldCatch) {
          this.cachedRequests.set(request.url, event);
        }
        this.removeRequestFromQueue(clonedReq);
      }),
      catchError((event: HttpErrorResponse) => {
        if (shouldShowFailure) {
          const {error, error_description} = event.error;
          this.showFailureToast(error, error_description);
          if (error.status === 401) {
            this.authService.logout();
          }
          return throwError(error);
        }
        this.removeRequestFromQueue(clonedReq);
      }),
      finalize(() => {
        this.removeRequestFromQueue(clonedReq);
      }),
    );
  }

  showSuccessToast(summary, detail) {
    this.overlayService.showToast({
      severity: 'success',
      position: 'top-right',
      summary,
      detail,
    });
  }

  showFailureToast(summary, detail) {
    this.overlayService.showToast({
      severity: 'error',
      position: 'top-right',
      summary,
      detail,
    });
  }

  findRequestByPath(targetArray: RequestConfig[], request: HttpRequest<any>) {
    const {pathname} = this.getUrlParts(request.url);
    const foundedIndex = targetArray.findIndex(x => {
      if (x.pathTemplate instanceof RegExp) {
        return x.pathTemplate.test(pathname) && x.method.toLowerCase() == request.method.toLowerCase()
      } else {
        return x.pathTemplate == pathname && x.method.toLowerCase() == request.method.toLowerCase()
      }
    });
    return foundedIndex >= 0
  }

  getUrlParts(url: string) {
    const linkElement = document.createElement('a');
    const res: { [key: string]: string } = {};
    linkElement.href = url;
    ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'].forEach((k) => {
      res[k] = linkElement[k];
    });
    linkElement.remove();
    return res;
  }

  removeRequestFromQueue(req: HttpRequest<any>) {
    const i = this.requestsQueue.indexOf(req);
    if (i >= 0) {
      this.requestsQueue.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requestsQueue.length > 0);
  }
}

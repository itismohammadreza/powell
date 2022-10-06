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
import {RequestsConfig} from "@core/requests.config";
import {LoaderService} from "@core/utils";
import {RequestConfig} from "@core/models";

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
    const shouldShowSuccess = this.isRequestFounded(this.hasSuccessMessageApis, request);
    const shouldShowFailure = this.isRequestFounded(this.hasFailureMessageApis, request);
    const shouldShowLoading = this.isRequestFounded(this.hasLoadingApis, request)
    const shouldCatch = this.isRequestFounded(this.catchEnabledApis, request);

    if (shouldCatch) {
      const cachedResponse = this.cachedRequests.get(request.url);
      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    if (shouldShowLoading) {
      this.requestsQueue.push(clonedReq);
      this.loaderService.setLoadingState(true);
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

  showSuccessToast(summary: string, detail: string) {
    this.overlayService.showToast({
      severity: 'success',
      summary,
      detail,
    });
  }

  showFailureToast(summary: string, detail: string) {
    this.overlayService.showToast({
      severity: 'error',
      summary,
      detail,
    });
  }

  isRequestFounded(targetArray: RequestConfig[], request: HttpRequest<any>) {
    const {pathname} = this.getUrlParts(request.url);
    const foundedIndex = targetArray.findIndex(x => {
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
    return foundedIndex >= 0;
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
}

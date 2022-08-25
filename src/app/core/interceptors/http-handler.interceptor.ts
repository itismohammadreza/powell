import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {finalize, Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UtilsService} from '@ng/services';
import {AuthService} from '@core/http';
import {RequestsConfig} from "@core/requests.config";
import {LoaderService} from "@core/utils";

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {
  constructor(private utilsService: UtilsService,
              private loaderService: LoaderService,
              private authService: AuthService) {
  }

  requestsQueue: HttpRequest<any>[] = [];
  hasSuccessMessageApis = RequestsConfig.filter(r => r.success);
  hasFailureMessageApis = RequestsConfig.filter(r => r.failure);
  hasLoadingApis = RequestsConfig.filter(r => r.loading);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = request.clone();
    const {pathname} = this.getUrlParts(request.url);
    const shouldShowSuccess = this.hasSuccessMessageApis.findIndex(x => x.pathname == pathname) >= 0;
    const shouldShowFailure = this.hasFailureMessageApis.findIndex(x => x.pathname == pathname) >= 0;
    const shouldShowLoading = this.hasLoadingApis.findIndex(x => x.pathname == pathname) >= 0;
    if (shouldShowLoading) {
      this.requestsQueue.push(clonedReq);
      this.loaderService.isLoading.next(true);
    }

    return next.handle(clonedReq).pipe(
      tap((event: any) => {
        if (!(event instanceof HttpResponse) || event.status !== 200) {
          return;
        }
        if (shouldShowSuccess) {
          this.showSuccessToast('', event.body.message)
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
    this.utilsService.showToast({
      severity: 'success',
      position: 'top-right',
      summary,
      detail,
    });
  }

  showFailureToast(summary, detail) {
    this.utilsService.showToast({
      severity: 'error',
      position: 'top-right',
      summary,
      detail,
    });
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

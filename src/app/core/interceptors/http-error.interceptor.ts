import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UtilsService} from '@ng/services';
import {AuthService} from '@core/http';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private utilsService: UtilsService, private authService: AuthService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error) {
          this.utilsService.showToast({
            summary: 'خطا',
            detail: error,
          });
          if (error.status === 401) {
            this.authService.logout();
          }
          return throwError(error);
        }
      })
    );
  }
}

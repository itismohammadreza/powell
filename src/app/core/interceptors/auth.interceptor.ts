import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from '@core/http';
import {httpUtils} from '@core/interceptors/http-utils';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const shouldSkip = httpUtils.getRequestProp(request, undefined, 'skipInterceptor');

  if (shouldSkip) {
    return next(request);
  }

  if (!!authService.getToken()) {
    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
}

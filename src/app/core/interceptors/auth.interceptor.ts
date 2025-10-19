import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from '@core/http';
import {RequestsConfig} from '@core/config';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  if (RequestsConfig.find((r) => r == request && r.skipInterceptor)) {
    return next(request);
  }
  if (authService.hasToken()) {
    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
}

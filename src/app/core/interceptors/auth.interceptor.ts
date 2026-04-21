import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {DataService} from '@core/http';
import {httpUtils} from '@core/interceptors/http-utils';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const dataService = inject(DataService);
  const shouldSkip = httpUtils.getRequestProp(request, undefined, 'skipInterceptor');

  if (shouldSkip) {
    return next(request);
  }

  if (!!dataService.getToken()) {
    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {
  HttpHandlerInterceptor,
  AuthInterceptor,
} from '@core/interceptors';
import {CacheInterceptor} from "@core/interceptors/cache.interceptor";

@NgModule({
  imports: [CommonModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpHandlerInterceptor, multi: true},
  ],
})
export class CoreModule {
}

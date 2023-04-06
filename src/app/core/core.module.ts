import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor, HttpHandlerInterceptor} from '@core/interceptors';
import {
  AnimateOnScrollService,
  DynamicDialogService,
  MomentService,
  OverlayService,
  PersianService,
  UtilsService
} from "@ng/api";

@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpHandlerInterceptor, multi: true},
    AnimateOnScrollService,
    DynamicDialogService,
    MomentService,
    OverlayService,
    PersianService,
    UtilsService
  ],
})
export class CoreModule {
}

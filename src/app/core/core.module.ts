import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthInterceptor, HttpHandlerInterceptor} from '@core/interceptors';
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {
  AnimateOnScrollService,
  initiateNgConfigProvider,
  MomentService,
  OverlayService,
  PersianService,
  UtilsService
} from "@powell/api";
import {appConfig} from "@core/config";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function initiateLanguage(translationService: TranslationService) {
  return (): Promise<any> => {
    return translationService.init();
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpHandlerInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initiateLanguage, deps: [TranslationService], multi: true},
    initiateNgConfigProvider({rtl: appConfig.rtl}),
    EnvServiceProvider,
    AnimateOnScrollService,
    MomentService,
    OverlayService,
    PersianService,
    UtilsService,
  ],
})
export class CoreModule {
}

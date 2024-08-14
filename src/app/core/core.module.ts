import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {MomentService, OverlayService, PersianService, providePowell, UtilsService} from "@powell/api";
import {globalConfig} from "@core/config";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function initiateLanguage(translationService: TranslationService) {
  return () => {
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
    {provide: APP_INITIALIZER, useFactory: initiateLanguage, deps: [TranslationService], multi: true},
    providePowell({
      rtl: globalConfig.rtl,
      ...globalConfig.powellConfig,
    }),
    EnvServiceProvider,
    MomentService,
    OverlayService,
    PersianService,
    UtilsService,
  ],
})
export class CoreModule {
}

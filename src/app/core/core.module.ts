import {inject, NgModule, provideAppInitializer} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {EnvServiceProvider, TranslationService} from "@core/utils";
import {MomentService, OverlayService, PersianService, UtilsService} from "@powell/api";

const httpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const initiateLanguage = (translationService: TranslationService) => {
  return translationService.init();
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
    provideAppInitializer(() => initiateLanguage(inject(TranslationService))),
    EnvServiceProvider,
    MomentService,
    OverlayService,
    PersianService,
    UtilsService,
  ],
})
export class CoreModule {
}

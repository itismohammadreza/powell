import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { CoreModule } from '@core/core.module';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor, httpHandlerInterceptor } from '@core/interceptors';
import { TranslationService } from '@core/utils';
import { provideTranslateService } from '@ngx-translate/core';
import { providePowell } from '@powell/api';
import { globalConfig } from '@core/config';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

const initiateLanguage = () => {
  const translationService = inject(TranslationService);
  return translationService.init();
}

const translationConfig = {
  loader: provideTranslateHttpLoader({
    prefix: '/i18n/',
    suffix: '.json'
  }),
  fallbackLang: 'en',
}

const powellConfig = {
  rtl: globalConfig.rtl,
  ...globalConfig.powellConfig,
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, httpHandlerInterceptor])),
    provideAppInitializer(() => initiateLanguage()),
    provideTranslateService(translationConfig),
    importProvidersFrom(CoreModule),
    providePowell(powellConfig),
  ]
};

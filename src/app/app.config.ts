import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {CoreModule} from "@core/core.module";
import {authInterceptor, httpHandlerInterceptor} from "@core/interceptors";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePowell} from "@powell/api";
import {globalConfig} from "@core/config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, httpHandlerInterceptor])),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideRouter(routes),
    providePowell({
      rtl: globalConfig.rtl,
      ...globalConfig.powellConfig,
    }),
    importProvidersFrom(CoreModule)
  ]
};

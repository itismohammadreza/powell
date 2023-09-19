import {AppConfig} from "@core/models";
import {RouteAnimation} from "@core/config";
import {Injector} from "@angular/core";

export const appConfig: AppConfig = {
  lang: 'en',
  rtl: false,
  requestTimeout: 15000,
  routeAnimation: RouteAnimation('fade2')
};

export class AppInjector {
  private static injector: Injector;

  static set(injector: Injector) {
    AppInjector.injector = injector;
  }

  static get() {
    return AppInjector.injector;
  }
}

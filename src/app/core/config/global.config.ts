import {AppConfig} from "@core/models";
import {RouteAnimation} from "@core/config";

export class Global {
  static Config: AppConfig = {
    lang: 'en',
    rtl: false,
    routeAnimation: RouteAnimation('fade2')
  };
}

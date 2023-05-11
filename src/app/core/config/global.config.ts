import {AppConfig} from "@core/models";
import {RouteAnimation} from "@core/config";

export class Global {
  static Config: AppConfig = {
    lang: 'en',
    routeAnimation: RouteAnimation('fade2')
  };
}

import {GlobalConfig} from "@core/models";
import {RouteAnimation} from "@core/config";

export const globalConfig: GlobalConfig = {
  lang: 'en',
  rtl: false,
  requestTimeout: 15000,
  routeAnimation: RouteAnimation('fade2'),
  powellConfig: {
    ripple: true,
    followConfig: true,
    fixLabelPosition: 'side',
    labelPosition: 'ifta',
    inputStyle: 'outlined',
    showRequiredStar: true,
    injectDirectionToRoot: true,
    theme: {
      name: 'Aura',
      mode: 'dark'
    }
  }
};

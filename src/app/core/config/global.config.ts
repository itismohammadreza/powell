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
    fixLabelPosition: 'fix-side',
    labelPosition: 'fix-side',
    inputStyle: 'outlined',
    showRequiredStar: true,
  }
};

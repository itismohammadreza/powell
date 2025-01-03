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
    fixLabelPos: 'fix-side',
    labelPos: 'fix-side',
    inputSize: 'small',
    inputStyle: 'outlined',
    showRequiredStar: true,
  }
};

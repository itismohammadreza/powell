import {GlobalConfig} from "@core/models";
import {RouteAnimation} from "@core/config";
import {$Aura} from '@powell/primeng';

export const globalConfig: GlobalConfig = {
  lang: 'en',
  rtl: false,
  requestTimeout: 15000,
  routeAnimation: RouteAnimation('fade2'),
  powellConfig: {
    ripple: false,
    followConfig: true,
    fixLabelPosition: 'side',
    labelPosition: 'ifta',
    inputVariant: 'outlined',
    showRequiredStar: true,
    injectDirectionToRoot: true,
    theme: {
      preset: $Aura,
      mode: 'system',
    }
  }
};

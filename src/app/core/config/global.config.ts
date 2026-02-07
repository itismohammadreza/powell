import {GlobalConfig} from "@core/models";
import {$Aura} from '@powell/primeng';

export const globalConfig: GlobalConfig = {
  lang: 'en',
  rtl: false,
  requestTimeout: 15000,
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
      primaryPalette: $Aura.primitive.blue,
      mode: 'system',
    }
  }
};

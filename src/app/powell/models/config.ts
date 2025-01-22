import {NgFixLabelPosition, NgLabelPosition, NgPresetName, NgSize} from "@powell/models";
import {$Preset, $PrimeNG, $PrimeNGConfigType} from "@powell/primeng";

type OmittedSignalsConfig =
  Omit<$PrimeNG, "setTranslation" | "csp" | "getTranslation" | "inputStyle" | "ripple" | "theme">
  & Exclude<$PrimeNGConfigType, "theme">;

export interface NgThemeObject {
  preset?: NgPresetName | $Preset<any>;
  options?: any;
}

export type NgTheme = NgThemeObject | 'none' | boolean;

export interface NgConfigChangeEvent {
  currentConfig: NgConfig;
  modifiedConfig: NgConfig;
}

export interface NgConfig extends Partial<OmittedSignalsConfig> {
  followConfig?: boolean;
  rtl?: boolean;
  labelPosition?: NgLabelPosition;
  fixLabelPosition?: NgFixLabelPosition;
  showRequiredStar?: boolean;
  inputSize?: NgSize;
  theme?: NgTheme;
}

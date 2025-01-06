import {NgFixLabelPosition, NgLabelPosition, NgSize} from "@powell/models";
import {$PrimeNG, $PrimeNGConfigType} from "@powell/primeng";

type OmittedConfig =
  Omit<$PrimeNG, "setTranslation" | "csp" | "getTranslation" | "inputStyle" | "ripple" | "theme">
  & $PrimeNGConfigType;

export interface NgConfigChangeEvent {
  currentConfig: NgConfig;
  modifiedConfig: NgConfig;
}

export interface NgConfig extends Partial<OmittedConfig> {
  followConfig?: boolean;
  rtl?: boolean;
  labelPosition?: NgLabelPosition;
  fixLabelPosition?: NgFixLabelPosition;
  showRequiredStar?: boolean;
  inputSize?: NgSize;
}

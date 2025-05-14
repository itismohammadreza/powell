import {NgFixLabelPosition, NgLabelPosition, NgSize} from "@powell/models";
import {$Preset, $PrimeNG, $PrimeNGConfigType} from "@powell/primeng";

type OmittedSignalsConfig =
  Omit<$PrimeNG, "setTranslation" | "csp" | "getTranslation" | "inputStyle" | "ripple" | "theme">
  & Omit<$PrimeNGConfigType, "theme">;

export type NgPresetName = 'Aura' | 'Lara' | 'Material' | 'Nora' | 'none';

export interface NgThemeOptions {
  prefix?: string;
  cssLayer?: {
    name?: string;
    order?: string;
  }
}

export type NgThemeMode = 'dark' | 'light' | 'system';

export type NgTheme = {name?: NgPresetName, preset?: $Preset<any>, mode?: NgThemeMode};

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
  injectDirectionToRoot?: boolean;
}

export interface NgInitialConfig extends NgConfig {
  themeOptions?: NgThemeOptions;
}

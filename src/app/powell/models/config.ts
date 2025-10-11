import {FixLabelPosition, LabelPosition, Size} from "@powell/models";
import {$PrimeNG, $PrimeNGConfigType} from "@powell/primeng";

type OmittedPrimeNgConfig =
  Omit<$PrimeNG,
    "baseStyle" |
    "csp" |
    "document" |
    "inputVariant" |
    "isThemeChanged" |
    "loadCommonTheme" |
    "onThemeChange" |
    "overlayAppendTo" |
    "ripple" |
    "setConfig" |
    "setThemeConfig" |
    "theme" |
    "translationObserver" |
    "inputStyle" |
    "ngOnDestroy">
  & Omit<$PrimeNGConfigType, "theme" | "filterMatchModeOptions">;

export interface ThemeOptions {
  prefix?: string;
  cssLayer?: {
    name?: string;
    order?: string;
  }
}

export type ThemeMode = 'dark' | 'light' | 'system';

export type Theme = {
  preset?: Record<string, SafeAny>;
  options?: ThemeOptions;
  mode?: ThemeMode;
  primaryPalette?: SafeAny;
  surfacePalette?: SafeAny;
};

export interface Preset {
  components?: any;
  semantic?: any;
  primitive?: any;
}

export interface ConfigChangeEvent {
  currentConfig: Config;
  modifiedConfig: Config;
}

export interface Config extends Partial<OmittedPrimeNgConfig> {
  followConfig?: boolean;
  rtl?: boolean;
  labelPosition?: LabelPosition;
  fixLabelPosition?: FixLabelPosition;
  showRequiredStar?: boolean;
  inputSize?: Size;
  theme?: Theme;
  injectDirectionToRoot?: boolean;
}

import {FixLabelPosition, LabelPosition, Size} from "@powell/models";
import {$Preset, $PrimeNG, $PrimeNGConfigType} from "@powell/primeng";

type OmittedSignalsConfig =
  Omit<$PrimeNG, "setTranslation" | "csp" | "getTranslation" | "inputStyle" | "ripple" | "theme">
  & Omit<$PrimeNGConfigType, "theme">;

export type PresetName = 'Aura' | 'Lara' | 'Material' | 'Nora' | 'none';

export interface ThemeOptions {
  prefix?: string;
  cssLayer?: {
    name?: string;
    order?: string;
  }
}

export type ThemeMode = 'dark' | 'light' | 'system';

export type Theme = {name?: PresetName, preset?: $Preset<any>, mode?: ThemeMode};

export interface ConfigChangeEvent {
  currentConfig: Config;
  modifiedConfig: Config;
}

export interface Config extends Partial<OmittedSignalsConfig> {
  followConfig?: boolean;
  rtl?: boolean;
  labelPosition?: LabelPosition;
  fixLabelPosition?: FixLabelPosition;
  showRequiredStar?: boolean;
  inputSize?: Size;
  theme?: Theme;
  injectDirectionToRoot?: boolean;
}

export interface InitialConfig extends Config {
  themeOptions?: ThemeOptions;
}

import {NgFixLabelPosition, NgInputVariant, NgLabelPosition, NgSize} from "@powell/models";
import {$PrimeNGConfig} from "@powell/primeng";

type OmittedConfig = Omit<$PrimeNGConfig, "setTranslation" | "csp" | "getTranslation" | "inputStyle">;

export interface NgConfigChangeEvent {
  currentConfig: NgConfig;
  modifiedConfig: NgConfig;
}

export interface NgConfig extends Partial<OmittedConfig> {
  followConfig?: boolean;
  rtl?: boolean;
  labelPos?: NgLabelPosition;
  fixLabelPos?: NgFixLabelPosition;
  inputSize?: NgSize;
  showRequiredStar?: boolean;
  theme?: NgTheme;
  inputStyle?: NgInputVariant;
  csp?: {nonce: string};
}

export type NgTheme =
  'arya-blue' |
  'arya-green' |
  'arya-orange' |
  'arya-purple' |
  'aura-dark-amber' |
  'aura-dark-blue' |
  'aura-dark-cyan' |
  'aura-dark-green' |
  'aura-dark-indigo' |
  'aura-dark-lime' |
  'aura-dark-noir' |
  'aura-dark-pink' |
  'aura-dark-teal' |
  'aura-dark-purple' |
  'aura-light-amber' |
  'aura-light-blue' |
  'aura-light-cyan' |
  'aura-light-green' |
  'aura-light-indigo' |
  'aura-light-lime' |
  'aura-light-noir' |
  'aura-light-pink' |
  'aura-light-teal' |
  'aura-light-purple' |
  'bootstrap4-dark-blue' |
  'bootstrap4-dark-purple' |
  'bootstrap4-light-blue' |
  'bootstrap4-light-purple' |
  'fluent-light' |
  'lara-dark-indigo' |
  'lara-dark-purple' |
  'lara-light-indigo' |
  'lara-light-purple' |
  'luna-amber' |
  'luna-blue' |
  'luna-green' |
  'luna-pink' |
  'md-dark-deeppurple' |
  'md-dark-indigo' |
  'md-light-deeppurple' |
  'md-light-indigo' |
  'mdc-dark-deeppurple' |
  'mdc-dark-indigo' |
  'mdc-light-deeppurple' |
  'mdc-light-indigo' |
  'mira' |
  'nano' |
  'nova' |
  'nova-accent' |
  'nova-alt' |
  'rhea' |
  'saga-blue' |
  'saga-green' |
  'saga-orange' |
  'saga-purple' |
  'soho-dark' |
  'soho-light' |
  'vela-blue' |
  'vela-green' |
  'vela-orange' |
  'vela-purple' |
  'viva-dark' |
  'viva-light';

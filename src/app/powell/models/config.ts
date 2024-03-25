import {NgFixLabelPosition, NgLabelPosition, NgSize} from "@powell/models";
import {PrimeOverlayOptions, PrimeTranslation} from "@powell/primeng/api";

interface NgZIndexOptions {
  modal: number;
  overlay: number;
  menu: number;
  tooltip: number;
}

export interface NgConfigChangeEvent {
  currentConfig: NgConfig;
  modifiedConfig: NgConfig;
}

export interface NgConfig {
  disableConfigChangeEffect?: boolean;
  rtl?: boolean;
  labelPos?: NgLabelPosition;
  fixLabelPos?: NgFixLabelPosition;
  filled?: boolean;
  inputSize?: NgSize;
  showRequiredStar?: boolean;
  theme?: NgTheme;
  zIndex?: NgZIndexOptions,
  ripple?: boolean;
  overlayOptions?: PrimeOverlayOptions;
  translation?: PrimeTranslation;
}

export type NgTheme =
  'arya-blue' |
  'arya-green' |
  'arya-orange' |
  'arya-purple' |
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

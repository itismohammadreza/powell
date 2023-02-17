import {NgFixLabelPosition, NgLabelPosition} from "@ng/models/forms";
import {NgSize} from "@ng/models/offset";

export interface NgConfig {
  ripple?: boolean;
  rtl?: boolean;
  theme?: NgTheme;
  labelPos?: NgLabelPosition;
  fixLabelPos?: NgFixLabelPosition;
  filled?: boolean;
  showRequiredStar?: boolean;
  inputSize?: NgSize;
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
  'tailwind-light' |
  'vela-blue' |
  'vela-green' |
  'vela-orange' |
  'vela-purple' |
  'viva-dark' |
  'viva-light';


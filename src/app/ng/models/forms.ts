import {NgColor} from './color';
import {NgPosition} from './offset';

export type NgDatePickerMode = 'day' | 'month' | 'time' | 'daytime';

export type NgAddonConfig =
  | {
  type: 'button';
  label?: string;
  color?: NgColor;
  icon?: string;
  iconPos?: NgPosition;
}
  | {
  type: 'icon';
  icon?: string;
}
  | {
  type: 'text';
  text?: string;
};

export interface NgAddon {
  before?: NgAddonConfig;
  after?: NgAddonConfig;
}

export class NgDropdownItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

export class NgDropdownGroup {
  label: string;
  value?: any;
  items: NgDropdownItem[];
}

export type NgFilterMatchMode =
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'equals'
  | 'notEquals'
  | 'in'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'between';

export type NgInputFileMode = 'basic' | 'advanced';

export type NgLabelPosition = 'fix-side' | 'fix-top' | 'float';

export type NgKeyFilter =
  | 'pint' // Positive integers
  | 'int' // Integers
  | 'pnum' // Positive numbers
  | 'num' // Numbers
  | 'hex' // Hexadecimal
  | 'email' // Email
  | 'alpha' // Alphabetic
  | 'alphanum'; // Alphanumeric

export type NgErrorType =
  | 'min'
  | 'max'
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'requiredTrue'
  | 'pattern'
  | 'nullValidator';

export type NgError = {
  [errorType in NgErrorType]?: string;
};

export type NgInputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type NgColorFormat = 'hex' | 'rgb' | 'hsb';
export type NgNumberMode = 'decimal' | 'currency';
export type NgNumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';
export type NgCurrencyDisplay = 'symbol' | 'code' | 'name';
export type NgCurrency = 'USD' | 'EUR' | 'IRR';

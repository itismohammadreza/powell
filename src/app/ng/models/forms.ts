import {NgColor} from './color';
import {NgIconPosition} from './offset';

export type NgFilePickerMode = 'basic' | 'advanced';
export type NgLabelPosition = 'fix-side' | 'fix-top' | 'float';
export type NgFixLabelPosition = Exclude<NgLabelPosition, 'float'>;
export type NgChipDisplayMode = 'comma' | 'chip';
export type NgDatepickerViewMode = 'date' | 'month' | 'year';
export type NgDatepickerSelectionMode = 'single' | 'multiple' | 'range';
export type NgDatepickerHourFormat = '12' | '24';
export type NgDatepickerDateType = 'date' | 'string';
export type NgColorFormat = 'hex' | 'rgb' | 'hsb';
export type NgNumberMode = 'decimal' | 'currency';
export type NgNumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';
export type NgCurrencyDisplay = 'symbol' | 'code' | 'name';
export type NgValidation = Partial<Record<NgValidationType, string>>; // equal to : [validationType in NgValidationType]?: string;
export type NgTreeFilterMode = 'strict' | 'lenient';

export interface NgAddonConfig {
  type: 'button' | 'icon' | 'text';
  label?: string;
  color?: NgColor;
  icon?: string;
  iconPos?: NgIconPosition;
  text?: string;
}

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

export type NgKeyFilter =
  | 'pint' // Positive integers
  | 'int' // Integers
  | 'pnum' // Positive numbers
  | 'num' // Numbers
  | 'hex' // Hexadecimal
  | 'email' // Email
  | 'alpha' // Alphabetic
  | 'alphanum'; // Alphanumeric

export type NgValidationType =
  | 'min'
  | 'max'
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'requiredTrue'
  | 'pattern'
  | 'nullValidator';

export type NgInputModes = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

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

export type NgCurrency =
  | 'AFN'
  | 'ALL'
  | 'DZD'
  | 'AOA'
  | 'ARS'
  | 'AMD'
  | 'AWG'
  | 'AZN'
  | 'BSD'
  | 'BHD'
  | 'BDT'
  | 'BBD'
  | 'BYR'
  | 'BZD'
  | 'BMD'
  | 'BTN'
  | 'BOB'
  | 'BOV'
  | 'BAM'
  | 'BWP'
  | 'BRL'
  | 'BND'
  | 'BGN'
  | 'BIF'
  | 'KHR'
  | 'CAD'
  | 'CVE'
  | 'KYD'
  | 'CLF'
  | 'CLP'
  | 'CNY'
  | 'COP'
  | 'COU'
  | 'KMF'
  | 'CDF'
  | 'CRC'
  | 'HRK'
  | 'CUC'
  | 'CUP'
  | 'CZK'
  | 'DJF'
  | 'DOP'
  | 'EGP'
  | 'SVC'
  | 'ERN'
  | 'ETB'
  | 'FKP'
  | 'FJD'
  | 'XAF'
  | 'GMD'
  | 'GEL'
  | 'GHS'
  | 'GIP'
  | 'DKK'
  | 'GTQ'
  | 'GNF'
  | 'GYD'
  | 'HTG'
  | 'HNL'
  | 'HKD'
  | 'HUF'
  | 'ISK'
  | 'INR'
  | 'IDR'
  | 'XDR'
  | 'IRR'
  | 'IQD'
  | 'ILS'
  | 'JMD'
  | 'JPY'
  | 'JOD'
  | 'KZT'
  | 'KES'
  | 'KPW'
  | 'KRW'
  | 'KWD'
  | 'KGS'
  | 'LAK'
  | 'LBP'
  | 'LSL'
  | 'LRD'
  | 'LYD'
  | 'MOP'
  | 'MKD'
  | 'MGA'
  | 'MWK'
  | 'MYR'
  | 'MVR'
  | 'MRO'
  | 'MUR'
  | 'XUA'
  | 'MXN'
  | 'MXV'
  | 'MDL'
  | 'MNT'
  | 'MZN'
  | 'MMK'
  | 'NAD'
  | 'NPR'
  | 'NIO'
  | 'NGN'
  | 'OMR'
  | 'PKR'
  | 'PAB'
  | 'PGK'
  | 'PYG'
  | 'PEN'
  | 'PHP'
  | 'PLN'
  | 'QAR'
  | 'RON'
  | 'RUB'
  | 'RWF'
  | 'SHP'
  | 'XCD'
  | 'WST'
  | 'STD'
  | 'SAR'
  | 'RSD'
  | 'SCR'
  | 'SLL'
  | 'SGD'
  | 'ANG'
  | 'XSU'
  | 'SBD'
  | 'SOS'
  | 'ZAR'
  | 'SSP'
  | 'EUR'
  | 'LKR'
  | 'SDG'
  | 'SRD'
  | 'NOK'
  | 'SZL'
  | 'SEK'
  | 'CHE'
  | 'CHF'
  | 'CHW'
  | 'SYP'
  | 'TWD'
  | 'TJS'
  | 'TZS'
  | 'THB'
  | 'XOF'
  | 'NZD'
  | 'TOP'
  | 'TTD'
  | 'TND'
  | 'TRY'
  | 'TMT'
  | 'AUD'
  | 'UGX'
  | 'UAH'
  | 'AED'
  | 'GBP'
  | 'USN'
  | 'UYI'
  | 'UYU'
  | 'UZS'
  | 'VUV'
  | 'VEF'
  | 'VND'
  | 'USD'
  | 'XPF'
  | 'MAD'
  | 'YER'
  | 'ZMW'
  | 'ZWL'
  | 'XBA'
  | 'XBB'
  | 'XBC'
  | 'XBD'
  | 'XTS'
  | 'XXX'
  | 'XAU'
  | 'XPD'
  | 'XPT'
  | 'XAG';

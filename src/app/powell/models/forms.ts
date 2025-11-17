import {LatLngLiteral, LeafletMouseEvent} from 'leaflet';

export type ElementAdditionTemplate = 'element' | 'addonStart' | 'addonEnd' | 'iconStart' | 'iconEnd' | 'label';
export type FilePickerMode = 'basic' | 'advanced';
export type FilePickerMethod = 'post' | 'put';
export type FileResultType = 'base64' | 'file' | 'none';
export type LabelPosition = 'ifta' | 'float-in' | 'float-on' | 'float-over' | 'side' | 'top';
export type FixLabelPosition = Exclude<LabelPosition, 'ifta' | 'float-in' | 'float-on' | 'float-over'>;
export type AutoCompleteDropdownMode = 'blank' | 'current';
export type ChipDisplayMode = 'comma' | 'chip';
export type DatepickerViewMode = 'date' | 'month' | 'year';
export type DatepickerSelectionMode = 'single' | 'multiple' | 'range';
export type DatepickerHourFormat = '12' | '24';
export type DatepickerIconDisplay = 'input' | 'button';
export type DatepickerDateType = 'date' | 'string';
export type ColorFormat = 'hex' | 'rgb' | 'hsb';
export type NumberMode = 'decimal' | 'currency';
export type NumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';
export type NumberLocaleMatcher = 'lookup' | 'best fit';
export type CurrencyDisplay = 'symbol' | 'code' | 'name';
export type Validation = Partial<Record<ValidationType | string, string>>; // equal to : [validationType in NgValidationType]?: string;
export type TreeFilterMode = 'strict' | 'lenient';
export type InputVariant = 'outlined' | 'filled';
export type FilterMatchMode =
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'equals'
  | 'notEquals'
  | 'in'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte';

export type KeyFilter =
  | 'pint' // Positive integers
  | 'int' // Integers
  | 'pnum' // Positive numbers
  | 'num' // Numbers
  | 'hex' // Hexadecimal
  | 'email' // Email
  | 'alpha' // Alphabetic
  | 'alphanum'; // Alphanumeric

export type ValidationType =
  | 'min'
  | 'max'
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'pattern';

export type InputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

export const MAP_MARKER_EVENTS = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'contextmenu', 'preclick'] as const;

export type MapMarkerEventType = typeof MAP_MARKER_EVENTS[number];

export interface MapMarkerEvent {
  marker: MapMarker;
  type: MapMarkerEventType;
  event: LeafletMouseEvent;
}

export interface MapMarker<T = SafeAny> extends LatLngLiteral {
  data?: T;
}

export type InputType =
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

export type Currency =
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

export interface Province {
  id: number;
  name: string;
  selected: boolean;
  disabled: boolean;
  d: string;
}

export interface CheckboxGroupChangeEvent {
  originalEvent: Event;
  value: SafeAny[];
}

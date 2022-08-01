import {SelectItem} from 'primeng/api';
import {NgColor} from './color';
import {NgFilterMatchMode} from './forms';

export type NgTableRendererType =
  | 'file'
  | 'text'
  | 'image'
  | 'date'
  | 'boolean'
  | 'html';
export type NgTableEditorType =
  | 'text'
  | 'file'
  | 'date'
  | 'boolean'
  | 'dropdown';
export type NgTableFilterType =
  | 'text'
  | 'numeric'
  | 'multi-select'
  | 'dropdown'
  | 'boolean'
  | 'date'
  | 'slider';

export class NgTableFilter {
  type?: NgTableFilterType;
  matchMode?: NgFilterMatchMode;
  showMatchModes?: boolean;
  showOperator?: boolean;
  showAddButton?: boolean;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  currency?: string;
  placeholder?: string;
  range?: boolean;
  display?: 'row' | 'menu' = 'menu';
  rangeValues?: [number, number];
  showMenu?: boolean = true;
  operator?: 'and' | 'or';
  showClearButton?: boolean = true;
  showApplyButton?: boolean = true;
  maxConstraints?: number = 2;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  prefix?: string;
  suffix?: string;
  currencyDisplay?: string;
  useGrouping?: boolean;
}

export class NgColDef {
  header?: string;
  field?: string;
  width?: number;
  sortable?: boolean;
  nullPlaceholder?: string;
  renderer?: {
    type?: NgTableRendererType;
    locale?: 'fa-ir' | 'en-us';
    trueIcon?: string;
    falseIcon?: string;
    showFileButton?: boolean;
    fileButtonDefaultBehavior?: boolean
  };
  edit?: {
    type?: NgTableEditorType;
    options?: SelectItem[];
    optionLabel?: string;
    optionValue?: string;
    resultType?: 'base64' | 'file';
    accept?: string;
  };
  filter?: NgTableFilter;
}

export class NgTableAction {
  action: string;
  tooltip?: string;
  icon?: string;
  color?: NgColor;
  className?: string;
  classConfigs?: {
    class: string;
    field: string;
    tobe: any;
  }[];
}

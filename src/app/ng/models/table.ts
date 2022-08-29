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

export interface NgTableFilter {
  type?: NgTableFilterType;
  header?: string;
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
  rangeValues?: [number, number];
  showMenu?: boolean;
  operator?: 'and' | 'or';
  showClearButton?: boolean;
  showApplyButton?: boolean;
  maxConstraints?: number;
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
  width?: string;
  sort?: boolean;
  filter?: NgTableFilter;
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

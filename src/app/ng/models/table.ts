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
  min?: number;
  max?: number;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  range?: boolean;
  sliderValue?: [number, number]; // filled in table component when range is enabled
  matchMode?: NgFilterMatchMode;
  showAddButton?: boolean;
  showMenu?: boolean;
  showClearButton?: boolean;
  showApplyButton?: boolean;
}

export class NgColDef {
  header?: string;
  field?: string;
  width?: string;
  sort?: boolean;
  filter?: NgTableFilter;
  renderer?: {
    type?: NgTableRendererType;
    locale?: 'fa-ir' | 'en-us';
    trueIcon?: string;
    falseIcon?: string;
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
}

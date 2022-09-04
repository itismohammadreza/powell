import {NgColor} from './color';
import {NgFilterMatchMode} from './forms';

export type NgTableRendererType =
  | 'text'
  | 'image'

export type NgTableFilterType =
  | 'text'
  | 'multi-select'
  | 'dropdown'
  | 'boolean'
  | 'gregorian-datepicker'
  | 'jalali-datepicker'
  | 'slider';

export interface NgTableFilter {
  type?: NgTableFilterType;
  dateFormat?: any;
  header?: string;
  min?: number;
  max?: number;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  range?: boolean;
  sliderValue?: [number, number] | number; // filled in table component when type is slider
  matchMode?: NgFilterMatchMode; // only works in local mode
}

export class NgColDef {
  header?: string;
  field?: string;
  width?: string;
  sort?: boolean;
  filter?: NgTableFilter;
  renderer?: {
    type?: NgTableRendererType;
    width?: string;
  };
}

export class NgTableAction {
  action: string;
  tooltip?: string;
  icon?: string;
  color?: NgColor;
  className?: string;
}

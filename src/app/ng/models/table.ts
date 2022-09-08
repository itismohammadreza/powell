import {NgColor} from './color';
import {NgFilterMatchMode} from './forms';

export type NgTableRendererType = 'text' | 'image' | 'ng-template';
export type NgTableFilterDisplay = 'row' | 'menu';
export type NgTableResponsiveLayout = 'stack' | 'scroll';
export type NgTablePaginationPosition = 'bottom' | 'top' | 'both';
export type NgTableSortMode = 'single' | 'multiple';
export type NgTableRowGroupMode = 'subheader' | 'rowspan';
export type NgTableContextMenuSelectionMode = 'separate' | 'joint';
export type NgTableCompareSelectionBy = 'equals' | 'deepEquals';
export type NgTableColumnResizeMode = 'expand' | 'fit';
export type NgTableStateStorage = 'session' | 'local';
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

export interface NgTableRender {
  as?: NgTableRendererType | ((item: any) => string)
  width?: string;
  preview?: boolean;// use in image renderer type
  height?: string;// use in image renderer type
}

export class NgColDef {
  header?: string;
  field?: string;
  width?: string;
  sort?: boolean;
  filter?: NgTableFilter;
  render?: NgTableRender;
  cellStyleClass?: string | ((item: any) => string);
}

export class NgTableAction {
  actionKey: string;
  tooltip?: string;
  icon?: string;
  label?: string;
  color?: NgColor;
  styleClass?: string;
  visible?: boolean | ((item: any) => boolean);
}

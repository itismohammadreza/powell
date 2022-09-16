import {NgColor} from './color';
import {NgFilterMatchMode} from './forms';
import {NgButtonAppearance} from "@ng/models/button";
import {NgIconPosition, NgSize} from "@ng/models/offset";

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
  rowFilterShowMenu?: boolean;
}

export interface NgTableRender<T = unknown> {
  as?: NgTableRendererType | ((item: T) => string)
  width?: string;
  preview?: boolean;// use in image renderer type
  height?: string;// use in image renderer type
}

export interface NgTableColDef<T = unknown> {
  header?: string;
  field?: string;
  width?: string;
  sort?: boolean;
  filter?: NgTableFilter;
  render?: NgTableRender<T>;
  cellStyleClass?: string | ((item: T) => string);
  visible?: boolean;
}

export interface NgTableActionsConfig<T = unknown> {
  header: string;
  inSameColumn: boolean;
  actions: NgTableAction<T>[]
}

export interface NgTableAction<T = unknown> {
  header?: string;
  tooltip?: string;
  icon?: string;
  label?: string;
  color?: NgColor;
  styleClass?: string;
  appearance?: NgButtonAppearance;
  iconPos?: NgIconPosition;
  rounded?: boolean;
  full?: boolean;
  size?: NgSize;
  visible?: boolean | ((item: T) => boolean);
  onClick?: (item: T) => void;
}

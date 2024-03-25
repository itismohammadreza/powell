import {
  NgAsyncEvent,
  NgButtonAppearance,
  NgColor,
  NgFilterMatchMode,
  NgIconPosition,
  NgPosition,
  NgSize
} from '@powell/models';
import {PrimeFilterMetadata} from "@powell/primeng/api";

export type NgTableRendererType = 'text' | 'image' | 'ng-template';
export type NgTableFilterDisplay = 'row' | 'menu';
export type NgTableResponsiveLayout = 'stack' | 'scroll';
export type NgTablePaginationPosition = 'bottom' | 'top' | 'both';
export type NgTableScrollDirection = 'vertical' | 'horizontal' | 'both';
export type NgTableSortMode = 'single' | 'multiple';
export type NgTableRowExpandMode = 'single' | 'multiple';
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

export type NgTableFilters = Record<string, PrimeFilterMetadata | PrimeFilterMetadata[]>;

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

export interface NgTableRender<T = any> {
  as?: NgTableRendererType | ((item: T) => string)
  width?: string;
  preview?: boolean;// use in image renderer type
  height?: string;// use in image renderer type
}

export interface NgTableColDef<T = any> {
  header?: string;
  field?: string;
  width?: string;
  sort?: boolean;
  filter?: NgTableFilter;
  render?: NgTableRender<T>;
  cellStyleClass?: string | ((item: T) => string);
  cellStyle?: any | ((item: T) => any);
  visible?: boolean;
}

export interface NgTableActionsConfig<T = any> {
  header: string;
  inSameColumn: boolean;
  actions: NgTableAction<T>[]
}

export interface NgTableAction<T = any> {
  header?: string;
  tooltip?: string;
  tooltipPosition?: NgPosition;
  icon?: string;
  label?: string;
  color?: NgColor;
  styleClass?: string;
  appearance?: NgButtonAppearance;
  iconPos?: NgIconPosition;
  rounded?: boolean;
  full?: boolean;
  async?: boolean;
  size?: NgSize;
  visible?: boolean | ((item: T) => boolean);
  onClick?: (item: T, index: number, event: Event) => any;
  onClickAsync?: (item: T, index: number, event: NgAsyncEvent<MouseEvent>) => any;
}

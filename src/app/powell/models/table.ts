import {
  AsyncEvent,
  ButtonAppearance,
  CssObject,
  FilterMatchMode,
  Position,
  Severity,
  Size
} from '@powell/models';
import {$FilterMetadata} from "@powell/primeng";

export type TableRendererType = 'text' | 'ng-template';
export type TableFilterDisplay = 'row' | 'menu';
export type TableResponsiveLayout = 'stack' | 'scroll';
export type TablePaginationPosition = 'bottom' | 'top' | 'both';
export type TableScrollDirection = 'vertical' | 'horizontal' | 'both';
export type TableSortMode = 'single' | 'multiple';
export type TableRowExpandMode = 'single' | 'multiple';
export type TableRowGroupMode = 'subheader' | 'rowspan';
export type TableContextMenuSelectionMode = 'separate' | 'joint';
export type TableCompareSelectionBy = 'equals' | 'deepEquals';
export type TableColumnResizeMode = 'expand' | 'fit';
export type TableStateStorage = 'session' | 'local';
export type TableFilterType =
  | 'text'
  | 'multi-select'
  | 'select'
  | 'boolean'
  | 'datepicker'
  | 'slider'
  | 'numeric';

export type TableFilters = Record<string, $FilterMetadata | $FilterMetadata[]>;

export interface TableFilter {
  type?: TableFilterType;
  dateFormat?: SafeAny;
  header?: string;
  min?: number;
  max?: number;
  options?: SafeAny[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  range?: boolean;
  sliderValue?: [number, number] | number; // filled in table component when type is slider
  matchMode?: FilterMatchMode; // only works in local mode
  rowFilterShowMenu?: boolean;
}

export interface TableColDef<T = SafeAny> {
  header?: string;
  field?: string;
  width?: string;
  sort?: boolean;
  filter?: TableFilter;
  render?: TableRendererType | ((item: T) => string);
  cellStyleClass?: string | ((item: T) => string);
  cellStyle?: CssObject | ((item: T) => SafeAny);
  visible?: boolean;
}

export interface TableActionsConfig<T = SafeAny> {
  header: string;
  inSameColumn: boolean;
  actions: TableAction<T>[]
}

export interface TableAction<T = SafeAny> {
  header?: string;
  tooltip?: string;
  tooltipPosition?: Position;
  icon?: string;
  label?: string;
  severity?: Severity;
  styleClass?: string;
  appearance?: ButtonAppearance;
  iconPos?: Position;
  rounded?: boolean;
  full?: boolean;
  async?: boolean;
  size?: Size;
  visible?: boolean | ((item: T) => boolean);
  onClick?: (item: T, index: number, event: Event) => SafeAny;
  onClickAsync?: (item: T, index: number, event: AsyncEvent<MouseEvent>) => SafeAny;
}

import {HttpHeaders} from '@angular/common/http';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {ContextMenu} from 'primeng/contextmenu';
import {NgButtonAppearance} from './button';
import {NgColor} from './color';
import {
  NgAddon,
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgErrorType,
  NgFilterMatchMode,
  NgInputFileMode,
  NgInputTypes,
  NgKeyFilter,
  NgNumberButtonLayout,
  NgNumberMode,
  NgTreeFilterMode,
} from './forms';
import {NgIconPosition, NgOrientation, NgPlace, NgSelectionMode, NgSize} from './offset';

export type NgSeverity = 'success' | 'info' | 'warn' | 'error';
export type DefaultFocus = 'accept' | 'reject';

export interface NgToastOptions {
  severity?: NgSeverity;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  icon?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  styleClass?: string;
  contentStyleClass?: string;
  preventDuplicates?: boolean;
  position?: NgPlace;
  style?: any;
  baseZIndex?: number;
  autoZIndex?: boolean;
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
  showTransformOptions?: string;
  hideTransformOptions?: string;
  breakpoints?: any;

  rtl?: boolean;
}

export interface NgConfirmPopupOptions {
  key?: string;
  message?: string;
  icon?: string;
  autoZIndex?: boolean;
  baseZIndex?: number;
  style?: any;
  styleClass?: string;
  target?: any;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  defaultFocus?: DefaultFocus;
  showTransitionOptions?: string;
  hideTransitionOptions?: string;

  acceptColor?: NgColor;
  acceptAppearance?: NgButtonAppearance;
  rejectColor?: NgColor;
  rejectAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  buttonIconPos?: NgIconPosition;
  rtl?: boolean;
}

export interface NgConfirmDialogOptions {
  header?: string;
  key?: string;
  blockScroll?: boolean;
  message?: string;
  icon?: string;
  dismissableMask?: boolean;
  closeOnEscape?: boolean;
  closable?: boolean;
  acceptLabel?: string;
  acceptVisible?: boolean;
  acceptIcon?: string;
  rejectLabel?: string;
  rejectIcon?: string;
  rejectVisible?: boolean;
  position?: NgPlace;
  focusTrap?: boolean;
  baseZIndex?: number;
  autoZIndex?: boolean;
  breakpoints?: any;
  transitionOptions?: string;
  acceptStyleClass?: string;
  rejectStyleClass?: string;
  style?: any;
  styleClass?: string;
  maskStyleClass?: string;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  defaultFocus?: DefaultFocus

  acceptColor?: NgColor;
  acceptAppearance?: NgButtonAppearance;
  rejectColor?: NgColor;
  rejectAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  buttonIconPos?: NgIconPosition;
  rtl?: boolean;
}

export interface NgMessageOptions {
  summary?: string;
  detail?: string;
  icon?: string;
}

export interface NgDialogOptions {
  header?: string;
  draggable?: boolean;
  keepInViewport?: boolean;
  resizable?: boolean;
  contentStyle?: object;
  modal?: boolean;
  position?: NgPlace;
  blockScroll?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  closable?: boolean;
  style?: object;
  styleClass?: string;
  maskStyleClass?: string;
  contentStyleClass?: string;
  showHeader?: boolean;
  baseZIndex?: number;
  autoZIndex?: boolean;
  minX?: number;
  minY?: number;
  focusOnShow?: boolean;
  focusTrap?: boolean;
  maximizable?: boolean;
  breakpoints?: object;
  transitionOptions?: string;
  closeIcon?: string;
  closeTabindex?: string;
  minimizeIcon?: string;
  maximizeIcon?: string;

  buttonIcon?: string;
  buttonIconPos?: NgIconPosition;
  buttonFull?: boolean;
  buttonLabel?: string;
  buttonColor?: NgColor;
  buttonAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  rtl?: boolean;
  content?: string;
}

export type NgDialogFormError = {
  type: NgErrorType;
  message: string;
  value?: any;
};

export interface NgDialogFormOptions {
  footer?: string;
  width?: string;
  height?: string;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  closable?: boolean;
  showHeader?: boolean;
  rtl?: boolean;
  acceptVisible?: boolean;
  acceptIcon?: string;
  acceptColor?: NgColor;
  acceptLabel?: string;
  acceptAppearance?: NgButtonAppearance;
  rejectVisible?: boolean;
  rejectIcon?: string;
  rejectColor?: NgColor;
  rejectLabel?: string;
  rejectAppearance?: NgButtonAppearance;
  formValidator: {
    validatorFn: (group: AbstractControl) => ValidationErrors | null,
    error: string,
    message: string,
  };
}

export type NgDialogFormRuleAction =
  | 'visible'
  | 'invisible'
  | 'disable'
  | 'enable';

export interface NgDialogFormRule {
  tobe: any[];
  control: string;
  action: NgDialogFormRuleAction;
}

export type NgDialogFormComponent =
  | 'hidden'
  | 'row'
  | 'template'
  | 'autocomplete'
  | 'cascade-select'
  | 'checkbox'
  | 'chips'
  | 'color-picker'
  | 'gregorian-datepicker'
  | 'jalali-datepicker'
  | 'dropdown'
  | 'editor'
  | 'file-picker'
  | 'file-picker2'
  | 'text'
  | 'mask'
  | 'number'
  | 'password'
  | 'textarea'
  | 'listbox'
  | 'multi-checkbox'
  | 'multi-select'
  | 'radio'
  | 'rating'
  | 'select-button'
  | 'slider'
  | 'switch'
  | 'toggle-button'
  | 'tree-select'
  | 'tree';

export interface NgDialogFormConfig {
  component: NgDialogFormComponent;
  formControlName?: string;
  className?: string | string[];
  visible?: boolean;
  value?: any;
  type?: NgInputTypes;
  suggestions?: any[];
  dropdown?: boolean;
  minlength?: number;
  completeOnFocus?: boolean;
  autoHighlight?: boolean;
  forceSelection?: boolean;
  dropdownMode?: 'blank' | 'current';
  unique?: boolean;
  field?: string;
  allowDuplicate?: boolean;
  addOnTab?: boolean;
  addOnBlur?: boolean;
  locale?: string;
  inline?: boolean;
  clearable?: boolean;
  optionGroupLabel?: string;
  optionGroupChildren?;
  editable?: boolean;
  autofocus?: boolean;
  autoDisplayFirst?: boolean;
  group?: boolean;
  showClear?: boolean;
  name?: string;
  url?: string;
  withCredentials?: boolean;
  customUpload?: boolean;
  auto?: boolean;
  accept?: string;
  method?: string;
  maxFileSize?: number;
  previewWidth?: number;
  fileLimit?: number;
  resultType?: 'base64' | 'file';
  chooseLabel?: string;
  uploadLabel?: string;
  cancelLabel?: string;
  headers?: HttpHeaders;
  showUploadButton?: boolean;
  showCancelButton?: boolean;
  invalidFileSizeMessageSummary?: string;
  invalidFileSizeMessageDetail?: string;
  invalidFileTypeMessageSummary?: string;
  invalidFileLimitMessageDetail?: string;
  invalidFileLimitMessageSummary?: string;
  invalidFileTypeMessageDetail?: string;
  mask?: string;
  slotChar?: string;
  autoClear?: boolean;
  unmask?: boolean;
  characterPattern?: string;
  autoFocus?: boolean;
  autocomplete?: string;
  format?: NgColorFormat | boolean | any;
  showButtons?: boolean;
  buttonLayout?: NgNumberButtonLayout;
  incrementButtonIcon?: string;
  decrementButtonIcon?: string;
  mode?: NgInputFileMode | NgNumberMode | any;
  prefix?: string;
  suffix?: string;
  currency?: NgCurrency;
  currencyDisplay?: NgCurrencyDisplay;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  title?: string;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  feedback?: boolean;
  toggleMask?: boolean;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxlength?: number;
  checkbox?: boolean;
  filled?: boolean;
  icon?: string;
  inputSize?: NgSize;
  appendTo?: string;
  autofocusFilter?;
  defaultLabel?: string;
  displaySelectedLabel?;
  emptyFilterMessage?: string;
  filterMatchMode?: NgFilterMatchMode;
  filterValue?: string;
  filterPlaceHolder?: string;
  maxSelectedLabels?;
  overlayVisible?: boolean;
  placeholder?: string;
  resetFilterOnHide?: boolean;
  selectedItemsLabel?: string;
  selectionLimit?: number;
  showHeader?: boolean;
  showToggleAll?: boolean;
  tooltip?: string;
  tooltipPosition?;
  stars?: number;
  cancel?: boolean;
  iconOnClass?: string;
  iconOffClass?: string;
  iconCancelClass?: string;
  addon?: NgAddon;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string;
  multiple?: boolean;
  dataKey?: string;
  binary?: boolean;
  animate?: boolean;
  min?: number;
  max?: number;
  orientation?: NgOrientation;
  step?: number;
  range?: boolean;
  onLabel?: string;
  offLabel?: string;
  onIcon?: string;
  offIcon?: string;
  iconPos?: NgIconPosition;
  disabled?: boolean;
  readonly?: boolean;
  selection?: any;
  label?: string;
  labelWidth?: number;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  labelPos?: any;
  errors?: NgDialogFormError[];
  items?: any[];
  selectionMode?: NgSelectionMode;
  contextMenu?: ContextMenu;
  layout?: NgOrientation;
  draggableScope?: string;
  droppableScope?: string;
  draggableNodes?: boolean;
  droppableNodes?: boolean;
  metaKeySelection?: boolean;
  propagateSelectionUp?: boolean;
  propagateSelectionDown?: boolean;
  loading?: boolean;
  validateDrop?;
  emptyMessage?: string;
  filter?: boolean;
  filterBy?: string;
  filterMode?: NgTreeFilterMode;
  filterPlaceholder?: string;
  filterLocale?: string;
  scrollHeight?: string;
  virtualScroll?: boolean;
  virtualNodeHeight?: number;
  minBufferPx?: number;
  maxBufferPx?: number;
  trackBy?: Function;
  indentation?: number;
  size?: NgSize | number | any;
  keyFilter?: NgKeyFilter | RegExp;
  style?: any;
  template?: string;
  color?: NgColor;
  rules?: NgDialogFormRule[];
}

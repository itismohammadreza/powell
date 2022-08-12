import {HttpHeaders} from '@angular/common/http';
import {ContextMenu} from 'primeng/contextmenu';
import {NgButtonAppearance} from './button';
import {NgColor} from './color';
import {
  NgAddon,
  NgAddonConfig,
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgDatePickerMode,
  NgErrorType,
  NgFilterMatchMode,
  NgInputFileMode, NgInputTypes,
  NgKeyFilter,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode,
} from './forms';
import {NgOrientation, NgPosition, NgSelectionMode, NgSize} from './offset';
import {NgTreeFilterMode} from './tree';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export interface NgConfirmOptions {
  // native service options
  key?: string;
  header?: string;
  message?: string;
  icon?: string;
  blockScroll?: boolean;
  dismissableMask?: boolean;
  closeOnEscape?: boolean;
  // native component options
  closable?: boolean;
  acceptLabel?: string;
  acceptVisible?: boolean;
  acceptColor?: NgColor;
  acceptAppearance?: NgButtonAppearance;
  acceptIcon?: string;
  rejectLabel?: string;
  rejectColor?: NgColor;
  rejectAppearance?: NgButtonAppearance;
  rejectIcon?: string;
  rejectVisible?: boolean;
  rtl?: boolean;
  position?: NgPosition;
  focusTrap?: boolean;
  appendTo?: any;
  baseZIndex?: number;
  autoZIndex?: boolean;
  breakpoints?: any;
  transitionOptions?: string;
  acceptStyleClass?: string;
  rejectStyleClass?: string;
  style?: any;
  styleClass?: string;
  maskStyleClass?: string;
}

export interface NgConfirmPopupOptions extends NgConfirmOptions {
  target?: any;
  defaultFocus?: 'accept' | 'reject';
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
}

export interface NgToastOptions {
  severity?: NgMessageSeverities;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  styleClass?: string;
  contentStyleClass?: string;
  preventOpenDuplicates?: boolean;
  preventDuplicates?: boolean;
  position?: NgPosition;
  rtl?: boolean;
  style?: string;
  baseZIndex?: number;
  autoZIndex?: boolean;
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
  showTransformOptions?: string;
  hideTransformOptions?: string;
  breakpoints?: object;
}

export type NgMessageSeverities = 'success' | 'info' | 'warn' | 'error';

export interface NgMessage {
  severity?: NgMessageSeverities;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
}

export interface NgMessageOptions {
  rtl?: boolean;
  // native properties
  severity?: NgMessageSeverities;
  summary?: string;
  detail?: string;
  closable?: boolean;
  style?: any;
  styleClass?: string;
  escape?: boolean;
  key?: string;
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
}


export interface NgDialog {
  message?: string;
  buttonLabel?: string;
  buttonIcon?: string;
  buttonAppearance?: NgButtonAppearance;
  buttonIconPos?: NgPosition;
  buttonRounded?: boolean;
  buttonRaised?: boolean;
  buttonColor?: NgColor;
  buttonFull?: boolean;
  buttonSize?: NgSize;
  // native properties
  header?: string;
  draggable?: boolean;
  keepInViewport?: boolean;
  resizable?: boolean;
  contentStyle?: any;
  visible?: boolean;
  modal?: boolean;
  position?: string;
  blockScroll?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  rtl?: boolean;
  closable?: boolean;
  appendTo?: any;
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
  breakpoints?: any;
  transitionOptions?: string;
  closeIcon?: string;
  closeAriaLabel?: string;
  closeTabindex?: string;
  minimizeIcon?: string;
  maximizeIcon?: string;
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
  | 'chips'
  | 'color-picker'
  | 'date-picker'
  | 'dropdown'
  | 'editor'
  | 'file-picker'
  | 'file-picker2'
  | 'text'
  | 'mask'
  | 'number'
  | 'password'
  | 'textarea'
  | 'list-box'
  | 'multi-checkbox'
  | 'multi-select'
  | 'radio'
  | 'rating'
  | 'select-button'
  | 'single-checkbox'
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
  datePickerMode?: NgDatePickerMode;
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
  showPassword?: boolean;
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
  iconPos?: NgPosition;
  disabled?: boolean;
  readonly?: boolean;
  selection?: any;
  label?: string;
  labelWidth?: number;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  labelPos?: NgLabelPosition;
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
  showImagePreview?: boolean;
  color?: NgColor;
  rules?: NgDialogFormRule[];
}

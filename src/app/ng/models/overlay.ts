import {HttpHeaders} from '@angular/common/http';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {ContextMenu} from 'primeng/contextmenu';
import {NgButtonAppearance, NgButtonType} from './button';
import {NgColor} from './color';
import {
  NgAddon,
  NgChipDisplayMode,
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgDatepickerDateType,
  NgDatepickerHourFormat,
  NgDatepickerSelectionMode,
  NgDatepickerViewMode,
  NgValidation,
  NgValidationType,
  NgFilterMatchMode,
  NgFixLabelPosition,
  NgFilePickerMode,
  NgInputTypes,
  NgKeyFilter,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode,
  NgTreeFilterMode,
} from './forms';
import {NgIconPosition, NgOrientation, NgPlace, NgPosition, NgSelectionMode, NgSize} from './offset';
import {SunEditorOptions} from "suneditor/src/options";
import {Core} from "suneditor/src/lib/core";
import {LatLng, LatLngBounds, LatLngLiteral} from "leaflet";
import {ScrollerOptions} from "primeng/scroller";

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
  minY?: number;
  minX?: number;
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

export interface NgDialogFormResult {
  formValue: any;
  changeDialogVisibilityTo: (visibility?: boolean) => void
}

export interface NgDialogFormValidation {
  type: NgValidationType;
  message: string;
  value?: any;
}

export interface NgDialogFormOptions {
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
  buttonFull?: boolean;
  formValidator?: {
    validatorFn: (group: AbstractControl) => ValidationErrors | null,
    error: string,
    message: string,
  };
}

// export type NgDialogFormRuleAction =
//   | 'visible'
//   | 'invisible'
//   | 'disable'
//   | 'enable';
//
// export interface NgDialogFormRule {
//   tobe: any[];
//   control: string;
//   action: NgDialogFormRuleAction;
// }

export type NgDialogFormComponent =
  | 'hidden'
  | 'template'
  | 'auto-complete'
  | 'button'
  | 'cascade-select'
  | 'checkbox'
  | 'chips'
  | 'color-picker'
  | 'dropdown'
  | 'dual-label-switch'
  | 'editor'
  | 'file-picker'
  | 'file-picker2'
  | 'gregorian-datepicker'
  | 'image'
  | 'input-mask'
  | 'input-number'
  | 'input-password'
  | 'input-text'
  | 'input-textarea'
  | 'jalali-datepicker'
  | 'knob'
  | 'listbox'
  | 'map'
  | 'message'
  | 'multi-checkbox'
  | 'multi-select'
  | 'radio'
  | 'rating'
  | 'select-button'
  | 'slider'
  | 'switch'
  | 'toggle-button'
  | 'tree'
  | 'tree-select'
  | 'tri-state-checkbox'

export interface NgDialogFormConfig {
  ///////////////////////////////////////// auto-complete /////////////////////////////////////////
  suggestions?: any[];
  dropdown?: boolean;
  minlength?: number;
  delay?: number;
  completeOnFocus?: boolean;
  autoHighlight?: boolean;
  showEmptyMessage?: boolean;
  forceSelection?: boolean;
  dropdownMode?: 'blank' | 'current';
  unique?: boolean;
  autocomplete?: string;
  completeMethod?: () => void;
  onUnselect?: () => void;
  onDropdownClick?: () => void;
  ///////////////////////////////////////// button /////////////////////////////////////////
  appearance?: NgButtonAppearance;
  rounded?: boolean;
  raised?: boolean;
  color?: NgColor;
  full?: boolean;
  badgeColor?: NgColor;
  newLabel?: string;
  newIcon?: string;
  newAppearance?: NgButtonAppearance;
  newColor?: NgColor;
  defaultState?: 1 | 2;
  badge?: string;
  badgeClass?: string;
  defaultStateChange?: () => void;
  onClickAsync?: () => void;
  ///////////////////////////////////////// cascade-select /////////////////////////////////////////
  onGroupChange?: () => void;
  onBeforeShow?: () => void;
  onBeforeHide?: () => void;
  ///////////////////////////////////////// checkbox /////////////////////////////////////////
  labelStyleClass?: string;
  ///////////////////////////////////////// chips /////////////////////////////////////////
  field?: string;
  allowDuplicate?: boolean;
  addOnTab?: boolean;
  addOnBlur?: boolean;
  separator?: string;
  onAdd?: () => void;
  onChipClick?: () => void;
  ///////////////////////////////////////// color-picker /////////////////////////////////////////
  ///////////////////////////////////////// dropdown /////////////////////////////////////////
  editable?: boolean;
  autofocus?: boolean;
  autoDisplayFirst?: boolean;
  ///////////////////////////////////////// dual-label-switch /////////////////////////////////////////
  labelLeft?: string;
  labelRight?: string;
  labelLeftValue?: string;
  labelRightValue?: string;
  ///////////////////////////////////////// editor /////////////////////////////////////////
  onDrop_param?: boolean;
  onCopy_param?: boolean;
  onCut_param?: boolean;
  onAudioUploadError_param?: boolean;
  onImageUploadBefore_param?: boolean;
  onImageUploadError_param?: boolean;
  onVideoUploadBefore_param?: boolean;
  onVideoUploadError_param?: boolean;
  onAudioUploadBefore_param?: boolean;
  onResizeEditor_param?: any;
  imageUploadHandler?: (xmlHttp: XMLHttpRequest, info: any, core: Core) => void;
  videoUploadHandler?: (xmlHttp: XMLHttpRequest, info: any, core: Core) => void;
  audioUploadHandler?: (xmlHttp: XMLHttpRequest, info: any, core: Core) => void;
  localStorageConfig?;
  created?: () => void;
  onload?: () => void;
  onMouseDown?: () => void;
  onResizeEditor?: () => void;
  onAudioUploadBefore?: () => void;
  onVideoUploadError?: () => void;
  onVideoUploadBefore?: () => void;
  onImageUploadError?: () => void;
  onImageUploadBefore?: () => void;
  onAudioUploadError?: () => void;
  onDrop?: () => void;
  showController?: () => void;
  toggleFullScreen?: () => void;
  toggleCodeView?: () => void;
  showInline?: () => void;
  onAudioUpload?: () => void;
  onVideoUpload?: () => void;
  onImageUpload?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  ///////////////////////////////////////// file-picker /////////////////////////////////////////
  name?: string;
  url?: string;
  method?: string;
  auto?: boolean;
  maxFileSize?: number;
  invalidFileSizeMessageSummary?: string;
  invalidFileSizeMessageDetail?: string;
  invalidFileTypeMessageSummary?: string;
  invalidFileLimitMessageDetail?: string;
  invalidFileLimitMessageSummary?: string;
  invalidFileTypeMessageDetail?: string;
  previewWidth?: number;
  uploadLabel?: string;
  cancelLabel?: string;
  chooseIcon?: string;
  uploadIcon?: string;
  cancelIcon?: string;
  withCredentials?: boolean;
  customUpload?: boolean;
  showUploadButton?: boolean;
  showCancelButton?: boolean;
  headers?: HttpHeaders;
  uploadStyleClass?: string;
  cancelStyleClass?: string;
  removeStyleClass?: string;
  chooseStyleClass?: string;
  onProgress?: () => void;
  onBeforeUpload?: () => void;
  onUpload?: () => void;
  onSend?: () => void;
  uploadHandler?: () => void;
  ///////////////////////////////////////// file-picker2 /////////////////////////////////////////
  accept?: string;
  fileLimit?: number;
  resultType?: 'base64' | 'file';
  chooseLabel?: string;
  onRemove?: () => void;
  ///////////////////////////////////////// gregorian-datepicker /////////////////////////////////////////
  defaultDate?: Date;
  dateFormat?: string;
  inline?: boolean;
  showOtherMonths?: boolean;
  selectOtherMonths?: boolean;
  showIcon?: boolean;
  showOnFocus?: boolean;
  showWeek?: boolean;
  datePickerIcon?: string;
  readonlyInput?: boolean;
  shortYearCutoff?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: any[];
  disabledDays?: any[];
  showTime?: boolean;
  hourFormat?: NgDatepickerHourFormat;
  timeOnly?: boolean;
  timeSeparator?: string;
  dataType?: NgDatepickerDateType;
  showSeconds?: boolean;
  stepHour?: number;
  stepMinute?: number;
  stepSecond?: number;
  maxDateCount?: number;
  showButtonBar?: boolean;
  todayButtonStyleClass?: string;
  clearButtonStyleClass?: string;
  panelStyleClass?: string;
  keepInvalid?: boolean;
  hideOnDateTimeSelect?: boolean;
  numberOfMonths?: number;
  view?: NgDatepickerViewMode;
  multipleSeparator?: string;
  rangeSeparator?: string;
  touchUI?: boolean;
  focusTrap?: boolean;
  firstDayOfWeek?: number;
  onSelect?: () => void;
  onClose?: () => void;
  onClickOutside?: () => void;
  onTodayClick?: () => void;
  onClearClick?: () => void;
  onMonthChange?: () => void;
  onYearChange?: () => void;
  ///////////////////////////////////////// image /////////////////////////////////////////
  onErrorImagePlaceholder?: string;
  imageClass?: string;
  imageStyle?: any;
  src?: string;
  alt?: string;
  width?: string;
  preview?: boolean;
  onError?: () => void;
  ///////////////////////////////////////// input-mask /////////////////////////////////////////
  mask?: string;
  slotChar?: string;
  autoClear?: boolean;
  unmask?: boolean;
  characterPattern?: string;
  autoFocus?: boolean;
  onComplete?: () => void;
  ///////////////////////////////////////// input-number /////////////////////////////////////////
  showButtons?: boolean;
  buttonLayout?: NgNumberButtonLayout;
  incrementButtonClass?: string;
  decrementButtonClass?: string;
  incrementButtonIcon?: string;
  decrementButtonIcon?: string;
  locale?: string;
  localeMatcher?: 'lookup' | 'best fit';
  prefix?: string;
  suffix?: string;
  currency?: NgCurrency;
  currencyDisplay?: NgCurrencyDisplay;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  allowEmpty?: boolean;
  title?: string;
  ///////////////////////////////////////// input-password /////////////////////////////////////////
  promptLabel?: string;
  mediumRegex?: string;
  strongRegex?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  feedback?: boolean;
  toggleMask?: boolean;
  inputStyle?: any;
  inputStyleClass?: string;
  ///////////////////////////////////////// input-text /////////////////////////////////////////
  keyFilter?: NgKeyFilter | RegExp;
  ///////////////////////////////////////// input-textarea /////////////////////////////////////////
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxlength?: number;
  onResize?: () => void;
  onInput?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  ///////////////////////////////////////// knob /////////////////////////////////////////
  valueColor?: string;
  rangeColor?: string;
  textColor?: string;
  strokeWidth?: number;
  showValue?: boolean;
  valueTemplate?: string;
  ///////////////////////////////////////// listbox /////////////////////////////////////////
  checkbox?: boolean;
  listStyle?: string;
  listStyleClass?: string;
  onDblClick?: () => void;
  ///////////////////////////////////////// map /////////////////////////////////////////
  clearMapBtnTooltip?: string;
  clearMapBtnIcon?: string;
  zoom?: number;
  center?: LatLng;
  height?: string;
  leafletMinZoom?: number;
  leafletMaxZoom?: number;
  leafletFitBounds?: LatLngBounds;
  leafletMaxBounds?: LatLngBounds;
  zoomChange?: () => void;
  centerChange?: () => void;
  onMapMarkerClick?: () => void;
  onMapClick?: () => void;
  onMapDoubleClick?: () => void;
  onMapMouseDown?: () => void;
  onMapMouseUp?: () => void;
  onMapMouseMove?: () => void;
  onMapMouseOver?: () => void;
  onMapMouseOut?: () => void;
  onMapMove?: () => void;
  onMapMoveStart?: () => void;
  onMapMoveEnd?: () => void;
  onMapZoom?: () => void;
  onMapZoomStart?: () => void;
  onMapZoomEnd?: () => void;
  ///////////////////////////////////////// message /////////////////////////////////////////
  inlineMessage?: string;
  summary?: string;
  detail?: string;
  severity?: NgSeverity;
  closable?: boolean;
  ///////////////////////////////////////// multi-checkbox /////////////////////////////////////////
  checkboxIcon?: string;
  ///////////////////////////////////////// multi-select /////////////////////////////////////////
  autofocusFilter?: boolean;
  autoZIndex?: boolean;
  baseZIndex?: number;
  defaultLabel?: string;
  displaySelectedLabel?: boolean;
  dropdownIcon?: string;
  emptyFilterMessage?: string;
  filterMatchMode?: NgFilterMatchMode;
  filterValue?: string;
  hideTransitionOptions?: string;
  itemSize?: number;
  maxSelectedLabels?: number;
  optionGroupLabel?: string;
  optionGroupChildren?: any;
  group?: boolean;
  overlayVisible?: boolean;
  panelStyle?: any;
  selectedItemsLabel?: string | 'ellipsis';
  selectionLimit?: number;
  showHeader?: boolean;
  showTransitionOptions?: string;
  showToggleAll?: boolean;
  tooltip?: any;
  tooltipStyleClass?: string;
  tooltipPosition?: NgPosition;
  tooltipPositionStyle?: string;
  onClick?: () => void;
  onPanelShow?: () => void;
  onPanelHide?: () => void;
  ///////////////////////////////////////// radio /////////////////////////////////////////
  onFocus?: () => void;
  onBlur?: () => void;
  ///////////////////////////////////////// rating /////////////////////////////////////////
  stars?: number;
  cancel?: boolean;
  iconOnClass?: string;
  iconOffClass?: string;
  iconCancelClass?: string;
  iconOnStyle?: any;
  iconOffStyle?: any;
  iconCancelStyle?: any;
  onRate?: () => void;
  onCancel?: () => void;
  ///////////////////////////////////////// select-botton /////////////////////////////////////////
  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string;
  multiple?: boolean;
  dataKey?: string;
  onOptionClick?: () => void;
  ///////////////////////////////////////// slider /////////////////////////////////////////
  animate?: boolean;
  min?: number;
  max?: number;
  orientation?: NgOrientation;
  step?: number;
  range?: boolean;
  onSlideEnd?: () => void;
  ///////////////////////////////////////// switch /////////////////////////////////////////
  async?: boolean;
  trueValue?: any;
  falseValue?: any;
  onChangeAsync?: () => void;
  ///////////////////////////////////////// toggle-button /////////////////////////////////////////
  onLabel?: string;
  offLabel?: string;
  onIcon?: string;
  offIcon?: string;
  onChange?: () => void;
  ///////////////////////////////////////// tree /////////////////////////////////////////
  items?: any[];
  selection?: any;
  contextMenu?: ContextMenu;
  layout?: NgOrientation;
  draggableScope?: string | string[];
  droppableScope?: string | string[];
  draggableNodes?: boolean;
  droppableNodes?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  validateDrop?: boolean;
  virtualScroll?: boolean;
  virtualScrollItemSize?: number;
  virtualScrollOptions?: ScrollerOptions;
  lazy?: boolean;
  trackBy?: Function;
  indentation?: number;
  onNodeContextMenuSelect?: () => void;
  onNodeDrop?: () => void;
  onLazyLoad?: () => void;
  onScroll?: () => void;
  onScrollIndexChange?: () => void;
  selectionChange?: () => void;
  ///////////////////////////////////////// tree-select /////////////////////////////////////////
  labelWidth?: number;
  icon?: string;
  labelPos?: NgLabelPosition;
  iconPos?: NgIconPosition;
  addon?: NgAddon;
  options?: any[];
  scrollHeight?: string;
  placeholder?: string;
  selectionMode?: NgSelectionMode;
  panelClass?: string;
  appendTo?: string;
  emptyMessage?: string;
  display?: NgChipDisplayMode;
  propagateSelectionUp?: boolean;
  propagateSelectionDown?: boolean;
  metaKeySelection?: boolean;
  filter?: boolean;
  filterBy?: string;
  filterMode?: NgTreeFilterMode;
  filterPlaceHolder?: string;
  filterLocale?: string;
  resetFilterOnHide?: boolean;
  showClear?: boolean;
  onBeforeBtnClick?: () => void;
  onAfterBtnClick?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onFilter?: () => void;
  onNodeSelect?: () => void;
  onNodeUnselect?: () => void;
  onNodeExpand?: () => void;
  onNodeCollapse?: () => void;
  onClear?: () => void;
  ///////////////////////////////////////// tri-state-checkbox /////////////////////////////////////////
  value?: any;
  label?: string;
  filled?: boolean;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  disabled?: boolean;
  tabindex?: any;
  style?: any;
  styleClass?: string;
  readonly?: boolean;
  checkboxTrueIcon?: string;
  checkboxFalseIcon?: string;

  // instead of 'size'
  selectiveSize?: NgSize;
  numericSize?: number;
  // instead of 'size'
  buttonType?: NgButtonType;
  inputType?: NgInputTypes;
  // instead of 'format'
  colorFormat?: NgColorFormat;
  enableFormat?: boolean;
  // instead of 'mode'
  filePickerMode?: NgFilePickerMode;
  numberMode?: NgNumberMode;
  // instead of 'selectionMode'
  datepickerSelectionMode?: NgDatepickerSelectionMode;
  // instead of 'labelPos'
  fixLabelPos?: NgFixLabelPosition;
  // instead of 'options'
  editorOptions?: SunEditorOptions;

  // out of components
  template?: string;
  validations?: NgDialogFormValidation[];
  component: NgDialogFormComponent;
  key?: string;
  className?: string | string[];
  visible?: boolean;

}

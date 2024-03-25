import {HttpHeaders} from '@angular/common/http';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {
  NgCssObject,
  NgAddon,
  NgAutoCompleteDropdownMode,
  NgButtonAppearance,
  NgButtonType,
  NgChipDisplayMode,
  NgColor,
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgDatepickerDateType,
  NgDatepickerHourFormat,
  NgDatepickerSelectionMode,
  NgDatepickerViewMode,
  NgDialogPosition,
  NgDisableZoomControl,
  NgFilePickerMethod,
  NgFilePickerMode,
  NgFileResultType,
  NgFilterMatchMode,
  NgFixLabelPosition,
  NgIconPosition,
  NgInputMode,
  NgInputType,
  NgKeyFilter,
  NgLabelPosition,
  NgLimitZoom,
  NgListener,
  NgNumberButtonLayout,
  NgNumberMode,
  NgOrientation,
  NgOverflow,
  NgPosition,
  NgSize,
  NgToastPosition,
  NgTreeFilterMode,
  NgTreeSelectionMode,
  NgValidationType
} from '@powell/models';
import {SunEditorOptions} from "suneditor/src/options";
import {Core} from "suneditor/src/lib/core";
import {LatLng, LatLngBounds} from "leaflet";
import {PrimeContextMenu} from "@powell/primeng";
import {PrimeScrollerOptions} from "@powell/primeng/api";
import {EventEmitter} from "@angular/core";

export type NgSeverity = 'success' | 'info' | 'warn' | 'error';
export type NgDefaultFocus = 'accept' | 'reject';
export type NgHistoricComponent = 'confirmDialog' | 'confirmPopup' | 'dialog' | 'dialogForm' | 'bottomSheet';

export interface NgHistoryState {
  key?: string;
  component: NgHistoricComponent;
}

export interface NgToastOptions {
  autoZIndex?: boolean;
  baseZIndex?: number;
  style?: NgCssObject;
  position?: NgToastPosition;
  preventOpenDuplicates?: boolean;
  preventDuplicates?: boolean;
  showTransformOptions?: string;
  hideTransformOptions?: string;
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
  breakpoints?: any;
  severity?: NgSeverity;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;
  closeIcon?: string;

  rtl?: boolean;
}

export interface NgMessageOptions {
  summary?: string;
  detail?: string;
  icon?: string;
}

export interface NgConfirmPopupOptions {
  showTransitionOptions?: string;
  hideTransitionOptions?: string;
  autoZIndex?: boolean;
  baseZIndex?: number;
  style?: NgCssObject;
  styleClass?: string;
  message?: string;
  key?: string;
  icon?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  blockScroll?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  defaultFocus?: NgDefaultFocus;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  target?: EventTarget;
  acceptEvent?: EventEmitter<any>;
  rejectEvent?: EventEmitter<any>;

  buttonFull?: boolean;
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
  icon?: string;
  message?: string;
  style?: NgCssObject;
  styleClass?: string;
  maskStyleClass?: string;
  acceptIcon?: string;
  acceptLabel?: string;
  closeAriaLabel?: string;
  acceptAriaLabel?: string;
  acceptVisible?: boolean;
  rejectIcon?: string;
  rejectLabel?: string;
  rejectAriaLabel?: string;
  rejectVisible?: boolean;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  blockScroll?: boolean;
  closable?: boolean;
  appendTo?: any;
  key?: string;
  autoZIndex?: boolean;
  baseZIndex?: number;
  transitionOptions?: string;
  focusTrap?: boolean;
  defaultFocus?: NgDefaultFocus;
  breakpoints?: any;
  visible?: any;
  position?: string;

  buttonFull?: boolean
  acceptColor?: NgColor;
  acceptAppearance?: NgButtonAppearance;
  rejectColor?: NgColor;
  rejectAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  buttonIconPos?: NgIconPosition;
  rtl?: boolean;
}

interface NgDialogBase {
  header?: string;
  draggable?: boolean;
  resizable?: boolean;
  positionLeft?: number;
  positionTop?: number;
  contentStyle?: any;
  contentStyleClass?: string;
  modal?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  rtl?: boolean;
  closable?: boolean;
  responsive?: boolean;
  appendTo?: any;
  breakpoints?: any;
  styleClass?: string;
  maskStyleClass?: string;
  maskStyle?: string;
  showHeader?: boolean;
  breakpoint?: number;
  blockScroll?: boolean;
  autoZIndex?: boolean;
  baseZIndex?: number;
  minX?: number;
  minY?: number;
  focusOnShow?: boolean;
  maximizable?: boolean;
  keepInViewport?: boolean;
  focusTrap?: boolean;
  transitionOptions?: string;
  closeIcon?: string;
  closeAriaLabel?: string;
  closeTabindex?: string;
  minimizeIcon?: string;
  maximizeIcon?: string;
  style?: NgCssObject;
  position?: NgDialogPosition;
  onShow?: () => any;
  onHide?: () => any;
  visibleChange?: (event: any) => any;
  onResizeInit?: (event: any) => any;
  onResizeEnd?: (event: any) => any;
  onDragEnd?: (event: any) => any;
  onMaximize?: (event: any) => any;
}

export interface NgDialogOptions extends NgDialogBase {
  buttonStyleClass?: string;
  buttonIcon?: string;
  buttonIconPos?: NgIconPosition;
  buttonFull?: boolean;
  buttonLabel?: string;
  buttonColor?: NgColor;
  buttonAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  content?: string;
}

export interface NgDialogFormOptions extends NgDialogBase {
  containerStyleClass?: string;
  containerStyle?: any;
  defaultFocus?: NgDefaultFocus;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
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
  buttonSize?: NgSize;
  submitDisabled?: boolean | ((dialogFormEvent?: NgDialogFormEventRes) => boolean);
  formValidator?: {
    type: string,
    validator: ValidatorFn,
    message: string,
    style?: any
  };
  rtl?: boolean;
}

export interface NgDialogFormResult {
  formValue: any;
  changeDialogVisibilityTo: (visibility?: boolean) => void
}

export interface NgDialogFormValidation {
  type: NgValidationType | string;
  validator: ValidatorFn;
  message: string | ((control: AbstractControl) => string);
}

export interface NgDialogFormEventRes {
  event?: any,
  form?: FormGroup;
  currentConfig?: NgDialogFormConfig;
  allConfig?: NgDialogFormConfig[];
}

export type NgDialogFormComponent =
    | 'hidden'
    | 'template'
    | 'auto-complete'
    | 'button'
    | 'cascade-select'
    | 'checkbox'
    | 'checkbox-group'
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
    | 'input-otp'
    | 'input-password'
    | 'input-text'
    | 'input-textarea'
    | 'iran-map'
    | 'jalali-datepicker'
    | 'knob'
    | 'listbox'
    | 'map'
    | 'message'
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
  dropdownMode?: NgAutoCompleteDropdownMode;
  unique?: boolean;
  autocomplete?: string;
  completeMethod?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onUnselect?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onDropdownClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
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
  defaultStateChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onClickAsync?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// cascade-select /////////////////////////////////////////
  onGroupChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onBeforeShow?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onBeforeHide?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// checkbox /////////////////////////////////////////
  labelStyleClass?: string;
  ///////////////////////////////////////// checkbox-group /////////////////////////////////////////
  checkboxIcon?: string;
  ///////////////////////////////////////// chips /////////////////////////////////////////
  field?: string;
  allowDuplicate?: boolean;
  addOnTab?: boolean;
  addOnBlur?: boolean;
  separator?: string;
  onAdd?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onChipClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// color-picker /////////////////////////////////////////
  ///////////////////////////////////////// dropdown /////////////////////////////////////////
  editable?: boolean;
  autofocus?: boolean;
  autoDisplayFirst?: boolean;
  ///////////////////////////////////////// dual-label-switch /////////////////////////////////////////
  labelLeft?: string;
  labelRight?: string;
  leftValue?: string;
  rightValue?: string;
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
  created?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onload?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMouseDown?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onResizeEditor?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onAudioUploadBefore?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onVideoUploadError?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onVideoUploadBefore?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onImageUploadError?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onImageUploadBefore?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onAudioUploadError?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onDrop?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  showController?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  toggleFullScreen?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  toggleCodeView?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  showInline?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onAudioUpload?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onVideoUpload?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onImageUpload?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onCut?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onCopy?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// file-picker /////////////////////////////////////////
  name?: string;
  url?: string;
  method?: NgFilePickerMethod;
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
  onProgress?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onBeforeUpload?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onUpload?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onSend?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  uploadHandler?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// file-picker2 /////////////////////////////////////////
  accept?: string;
  fileLimit?: number;
  resultType?: NgFileResultType;
  chooseLabel?: string;
  onRemove?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  isUnknownImageUrl?: boolean;
  ///////////////////////////////////////// gregorian-datepicker /////////////////////////////////////////
  ///////////////////////////////////////// jalali-datepicker /////////////////////////////////////////
  defaultDate?: any; // Date | Moment
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
  minDate?: any; // Date | Moment
  maxDate?: any; // Date | Moment
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
  onSelect?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onClose?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onClickOutside?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onTodayClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onClearClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMonthChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onYearChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// image /////////////////////////////////////////
  src?: string;
  alt?: string;
  width?: string;
  preview?: boolean;
  pinchTransitionDuration?: number;
  pinchDoubleTap?: boolean;
  pinchDoubleTapScale?: number;
  pinchAutoZoomOut?: boolean;
  pinchLimitZoom?: NgLimitZoom;
  pinchDisabled?: boolean;
  pinchDisablePan?: boolean;
  pinchOverflow?: NgOverflow;
  pinchZoomControlScale?: number;
  pinchDisableZoomControl?: NgDisableZoomControl;
  pinchLimitPan?: boolean;
  pinchMinPanScale?: number;
  pinchMinScale?: number;
  pinchListeners?: NgListener;
  pinchWheel?: boolean;
  pinchAutoHeight?: boolean;
  pinchWheelZoomFactor?: number;
  pinchDraggableImage?: boolean;
  previewStyle?: any;
  previewStyleClass?: string;
  imageStyle?: any;
  imageStyleClass?: string;
  previewImageStyle?: any;
  previewImageStyleClass?: string;
  errorPlaceholderSrc?: string;
  onImageError?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// input-mask /////////////////////////////////////////
  mask?: string;
  slotChar?: string;
  autoClear?: boolean;
  unmask?: boolean;
  characterPattern?: string;
  autoFocus?: boolean;
  onComplete?: (dialogFormEvent?: NgDialogFormEventRes) => void;
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
  ///////////////////////////////////////// input-otp /////////////////////////////////////////
  inputCount?: number;
  allowedKeyCodes?: string[];
  numbersOnly?: boolean;
  autoFocusFirst?: boolean;
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
  inputMode?: NgInputMode;
  onPaste?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// input-textarea /////////////////////////////////////////
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxlength?: number;
  onResize?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onInput?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onKeyDown?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onKeyUp?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// iran-map /////////////////////////////////////////
  disabledProvinces?: number;
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
  onDblClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// map /////////////////////////////////////////
  clearMarkerOnClick?: boolean;
  clearTooltip?: string;
  clearIcon?: string;
  zoom?: number;
  center?: LatLng;
  height?: string;
  leafletMinZoom?: number;
  leafletMaxZoom?: number;
  leafletFitBounds?: LatLngBounds;
  leafletMaxBounds?: LatLngBounds;
  zoomChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  centerChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMarkerClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapDoubleClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMouseDown?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMouseUp?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMouseMove?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMouseOver?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMouseOut?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMove?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMoveStart?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapMoveEnd?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapZoom?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapZoomStart?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onMapZoomEnd?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// message /////////////////////////////////////////
  inlineMessage?: string;
  summary?: string;
  detail?: string;
  severity?: NgSeverity;
  closable?: boolean;
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
  onClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onPanelShow?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onPanelHide?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// radio /////////////////////////////////////////
  onFocus?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onBlur?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// rating /////////////////////////////////////////
  stars?: number;
  cancel?: boolean;
  iconOnClass?: string;
  iconOffClass?: string;
  iconCancelClass?: string;
  iconOnStyle?: any;
  iconOffStyle?: any;
  iconCancelStyle?: any;
  onRate?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onCancel?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// select-botton /////////////////////////////////////////
  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string;
  multiple?: boolean;
  dataKey?: string;
  onOptionClick?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// slider /////////////////////////////////////////
  animate?: boolean;
  min?: number;
  max?: number;
  orientation?: NgOrientation;
  step?: number;
  range?: boolean;
  onSlideEnd?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// switch /////////////////////////////////////////
  async?: boolean;
  showAsyncLoading?: boolean;
  trueValue?: any;
  falseValue?: any;
  onChangeAsync?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// toggle-button /////////////////////////////////////////
  onLabel?: string;
  offLabel?: string;
  onIcon?: string;
  offIcon?: string;
  onChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// tree /////////////////////////////////////////
  items?: any[];
  selection?: any;
  contextMenu?: PrimeContextMenu;
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
  virtualScrollOptions?: PrimeScrollerOptions;
  lazy?: boolean;
  trackBy?: Function;
  indentation?: number;
  onNodeContextMenuSelect?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onNodeDrop?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onLazyLoad?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onScroll?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onScrollIndexChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  selectionChange?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// tree-select /////////////////////////////////////////
  labelWidth?: number;
  icon?: string;
  labelPos?: NgLabelPosition;
  iconPos?: NgIconPosition;
  addon?: NgAddon;
  options?: any[];
  scrollHeight?: string;
  placeholder?: string;
  selectionMode?: NgTreeSelectionMode;
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
  onShow?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onHide?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onFilter?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onNodeSelect?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onNodeUnselect?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onNodeExpand?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onNodeCollapse?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  onClear?: (dialogFormEvent?: NgDialogFormEventRes) => void;
  ///////////////////////////////////////// tri-state-checkbox /////////////////////////////////////////
  value?: any;
  label?: string;
  filled?: boolean;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  disabled?: boolean | ((dialogFormEvent?: NgDialogFormEventRes) => boolean);
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
  inputType?: NgInputType;
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
  hidden?: boolean | ((dialogFormEvent?: NgDialogFormEventRes) => boolean);
}

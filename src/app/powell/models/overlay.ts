import {HttpHeaders} from '@angular/common/http';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {
  NgAutoCompleteDropdownMode,
  NgButtonAppearance,
  NgButtonState,
  NgButtonType,
  NgChipDisplayMode,
  NgColorFormat,
  NgCssObject,
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
  NgInputMode,
  NgInputType,
  NgInputVariant,
  NgKeyFilter,
  NgLabelPosition,
  NgLimitZoom,
  NgListener,
  NgNumberButtonLayout,
  NgNumberMode,
  NgOrientation,
  NgOverflow,
  NgPosition,
  NgSeverity,
  NgSize,
  NgToastPosition,
  NgTreeFilterMode,
  NgTreeSelectionMode,
  NgValidationType
} from '@powell/models';
import {SunEditorOptions} from "suneditor/src/options";
import {Core} from "suneditor/src/lib/core";
import {LatLng, LatLngBounds} from "leaflet";
import {$ContextMenu, $ScrollerOptions} from "@powell/primeng";
import {EventEmitter} from "@angular/core";

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
  severity?: Exclude<NgSeverity, 'secondary' | 'warning' | 'help' | 'danger'> | 'warn' | 'error';
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
  acceptSeverity?: NgSeverity;
  acceptAppearance?: NgButtonAppearance;
  rejectSeverity?: NgSeverity;
  rejectAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  buttonIconPos?: NgPosition;
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
  acceptSeverity?: NgSeverity;
  acceptAppearance?: NgButtonAppearance;
  rejectSeverity?: NgSeverity;
  rejectAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  buttonIconPos?: NgPosition;
  rtl?: boolean;
}

interface NgDialogBase {
  header?: string;
  draggable?: boolean;
  resizable?: boolean;
  positionLeft?: number;
  positionTop?: number;
  contentStyle?: NgCssObject;
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
  maskStyle?: NgCssObject;
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
  buttonIconPos?: NgPosition;
  buttonFull?: boolean;
  buttonLabel?: string;
  buttonSeverity?: NgSeverity;
  buttonAppearance?: NgButtonAppearance;
  buttonSize?: NgSize;
  content?: string;
}

export interface NgDialogFormOptions extends NgDialogBase {
  containerStyleClass?: string;
  containerStyle?: NgCssObject;
  defaultFocus?: NgDefaultFocus;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  acceptVisible?: boolean;
  acceptIcon?: string;
  acceptSeverity?: NgSeverity;
  acceptLabel?: string;
  acceptAppearance?: NgButtonAppearance;
  rejectVisible?: boolean;
  rejectIcon?: string;
  rejectSeverity?: NgSeverity;
  rejectLabel?: string;
  rejectAppearance?: NgButtonAppearance;
  buttonFull?: boolean;
  buttonSize?: NgSize;
  buttonIconPos?: NgPosition;
  submitDisabled?: boolean | ((dialogFormEvent?: NgDialogFormEvent) => boolean);
  formValidator?: {
    type: string,
    validator: ValidatorFn,
    message: string,
    style?: NgCssObject
  };
}

export interface NgDialogFormResult {
  formValue: any;
  finalizeSubmit: (hide?: boolean) => void
}

export interface NgDialogFormValidation {
  type: NgValidationType | string;
  validator: ValidatorFn;
  message: string | ((control: AbstractControl) => string);
}

export interface NgDialogFormEvent {
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
  | 'color-picker'
  | 'dual-label-switch'
  | 'editor'
  | 'file-picker'
  | 'file-picker2'
  | 'datepicker'
  | 'image'
  | 'input-mask'
  | 'input-number'
  | 'input-otp'
  | 'input-password'
  | 'input-text'
  | 'input-textarea'
  | 'iran-map'
  | 'knob'
  | 'listbox'
  | 'map'
  | 'multi-select'
  | 'radio'
  | 'rating'
  | 'select'
  | 'select-button'
  | 'slider'
  | 'toggle-switch'
  | 'toggle-button'
  | 'tree'
  | 'tree-select'

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
  completeMethod?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onUnselect?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onDropdownClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// button /////////////////////////////////////////
  appearance?: NgButtonAppearance;
  rounded?: boolean;
  raised?: boolean;
  full?: boolean;
  badgeSeverity?: NgSeverity;
  newLabel?: string;
  newIcon?: string;
  newAppearance?: NgButtonAppearance;
  newSeverity?: NgSeverity;
  state?: NgButtonState;
  badge?: string;
  badgeClass?: string;
  defaultStateChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onClickAsync?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// cascade-select /////////////////////////////////////////
  onGroupChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onBeforeShow?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onBeforeHide?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  onAdd?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onChipClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// color-picker /////////////////////////////////////////
  ///////////////////////////////////////// select /////////////////////////////////////////
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
  created?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onload?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMouseDown?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onResizeEditor?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onAudioUploadBefore?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onVideoUploadError?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onVideoUploadBefore?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onImageUploadError?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onImageUploadBefore?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onAudioUploadError?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onDrop?: (dialogFormEvent?: NgDialogFormEvent) => void;
  showController?: (dialogFormEvent?: NgDialogFormEvent) => void;
  toggleFullScreen?: (dialogFormEvent?: NgDialogFormEvent) => void;
  toggleCodeView?: (dialogFormEvent?: NgDialogFormEvent) => void;
  showInline?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onAudioUpload?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onVideoUpload?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onImageUpload?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onCut?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onCopy?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  onProgress?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onBeforeUpload?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onUpload?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onSend?: (dialogFormEvent?: NgDialogFormEvent) => void;
  uploadHandler?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// file-picker2 /////////////////////////////////////////
  accept?: string;
  fileLimit?: number;
  resultType?: NgFileResultType;
  chooseLabel?: string;
  onRemove?: (dialogFormEvent?: NgDialogFormEvent) => void;
  isUnknownImageUrl?: boolean;
  ///////////////////////////////////////// datepicker /////////////////////////////////////////
  defaultDate?: any; // Date | Moment
  dateFormat?: string;
  inline?: boolean;
  showOtherMonths?: boolean;
  selectOtherMonths?: boolean;
  showIcon?: boolean;
  showOnFocus?: boolean;
  showWeek?: boolean;
  datepickerIcon?: string;
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
  onSelect?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onClose?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onClickOutside?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onTodayClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onClearClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMonthChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onYearChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  previewStyle?: NgCssObject;
  previewStyleClass?: string;
  imageStyle?: NgCssObject;
  imageStyleClass?: string;
  previewImageStyle?: NgCssObject;
  previewImageStyleClass?: string;
  errorPlaceholderSrc?: string;
  onImageError?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// input-mask /////////////////////////////////////////
  mask?: string;
  slotChar?: string;
  autoClear?: boolean;
  unmask?: boolean;
  characterPattern?: string;
  autoFocus?: boolean;
  onComplete?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  inputStyle?: NgCssObject;
  inputStyleClass?: string;
  ///////////////////////////////////////// input-text /////////////////////////////////////////
  keyFilter?: NgKeyFilter | RegExp;
  inputMode?: NgInputMode;
  onPaste?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// input-textarea /////////////////////////////////////////
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxlength?: number;
  onResize?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onInput?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onKeyDown?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onKeyUp?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  listStyle?: NgCssObject;
  listStyleClass?: string;
  onDblClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  zoomChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  centerChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMarkerClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapDoubleClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMouseDown?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMouseUp?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMouseMove?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMouseOver?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMouseOut?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMove?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMoveStart?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapMoveEnd?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapZoom?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapZoomStart?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onMapZoomEnd?: (dialogFormEvent?: NgDialogFormEvent) => void;
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
  panelStyle?: NgCssObject;
  selectedItemsLabel?: string | 'ellipsis';
  selectionLimit?: number;
  showHeader?: boolean;
  showTransitionOptions?: string;
  showToggleAll?: boolean;
  tooltip?: any;
  tooltipStyleClass?: string;
  tooltipPosition?: NgPosition;
  tooltipPositionStyle?: string;
  onClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onPanelShow?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onPanelHide?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// radio /////////////////////////////////////////
  onFocus?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onBlur?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// rating /////////////////////////////////////////
  stars?: number;
  cancel?: boolean;
  iconOnClass?: string;
  iconOffClass?: string;
  iconCancelClass?: string;
  iconOnStyle?: NgCssObject;
  iconOffStyle?: NgCssObject;
  iconCancelStyle?: NgCssObject;
  onRate?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onCancel?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// select-botton /////////////////////////////////////////
  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string;
  multiple?: boolean;
  dataKey?: string;
  onOptionClick?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// slider /////////////////////////////////////////
  animate?: boolean;
  min?: number;
  max?: number;
  orientation?: NgOrientation;
  step?: number;
  range?: boolean;
  onSlideEnd?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// toggle-switch /////////////////////////////////////////
  async?: boolean;
  showAsyncLoading?: boolean;
  trueValue?: any;
  falseValue?: any;
  onChangeAsync?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// toggle-button /////////////////////////////////////////
  onLabel?: string;
  offLabel?: string;
  onIcon?: string;
  offIcon?: string;
  onChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// tree /////////////////////////////////////////
  items?: any[];
  selection?: any;
  contextMenu?: $ContextMenu;
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
  virtualScrollOptions?: $ScrollerOptions;
  lazy?: boolean;
  trackBy?: Function;
  indentation?: number;
  onNodeContextMenuSelect?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onNodeDrop?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onLazyLoad?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onScroll?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onScrollIndexChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  selectionChange?: (dialogFormEvent?: NgDialogFormEvent) => void;
  ///////////////////////////////////////// tree-select /////////////////////////////////////////
  labelWidth?: number;
  icon?: string;
  iconPos?: NgPosition;
  scrollHeight?: string;
  placeholder?: string;
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
  onShow?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onHide?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onFilter?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onNodeSelect?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onNodeUnselect?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onNodeExpand?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onNodeCollapse?: (dialogFormEvent?: NgDialogFormEvent) => void;
  onClear?: (dialogFormEvent?: NgDialogFormEvent) => void;
  value?: any;
  label?: string;
  variant?: NgInputVariant;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  disabled?: boolean | ((dialogFormEvent?: NgDialogFormEvent) => boolean);
  tabindex?: any;
  style?: NgCssObject;
  styleClass?: string;
  readonly?: boolean;
  checkboxTrueIcon?: string;
  checkboxFalseIcon?: string;
  size?: NgSize | number;
  type?: NgButtonType | NgInputType;
  format?: NgColorFormat | boolean;
  mode?: NgFilePickerMode | NgNumberMode;
  selectionMode?: NgDatepickerSelectionMode | NgTreeSelectionMode;
  labelPosition?: NgLabelPosition;
  options?: SunEditorOptions | any[];

  // out of components
  template?: string;
  validations?: NgDialogFormValidation[];
  component: NgDialogFormComponent;
  key?: string;
  className?: string | string[];
  hidden?: boolean | ((dialogFormEvent?: NgDialogFormEvent) => boolean);
}

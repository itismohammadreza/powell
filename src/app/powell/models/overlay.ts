import {HttpHeaders} from '@angular/common/http';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {
  AutoCompleteDropdownMode,
  ButtonAppearance,
  ButtonProps,
  ButtonState,
  ButtonType,
  ChipDisplayMode,
  ColorFormat,
  CssObject,
  Currency,
  CurrencyDisplay,
  DatepickerDateType,
  DatepickerHourFormat,
  DatepickerSelectionMode,
  DatepickerViewMode,
  FilePickerMethod,
  FilePickerMode,
  FileResultType,
  FilterMatchMode,
  InputMode,
  InputType,
  InputVariant,
  KeyFilter,
  LabelPosition,
  NumberButtonLayout,
  NumberLocaleMatcher,
  NumberMode,
  Orientation,
  PinchOverflow,
  PinchDisableZoomControl,
  PinchLimitZoom,
  PinchListener,
  Position,
  Severity,
  Size,
  TreeFilterMode,
  TreeSelectionMode,
  ValidationType
} from '@powell/models';
import {SunEditorOptions} from "suneditor/src/options";
import {Core} from "suneditor/src/lib/core";
import {LatLng, LatLngBounds} from "leaflet";
import {$Confirmation, $ContextMenu, $ScrollerOptions, $ToastMessageOptions, $ToastPositionType} from "@powell/primeng";
import {TemplateRef} from "@angular/core";
import {Moment} from "jalali-moment";

export type DefaultFocus = 'accept' | 'reject';
export type HistoricComponent = 'confirmDialog' | 'confirmPopup' | 'dialog' | 'dialogForm' | 'bottomSheet';

export type DialogPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright'
  | 'center';

export interface HistoryState {
  key?: string;
  component: HistoricComponent;
}

export interface ToastOptions extends $ToastMessageOptions {
  position?: $ToastPositionType;
  preventDuplicates?: boolean;
  breakpoints?: Object;
  showTransformOptions?: string;
  showTransitionOptions?: string;
  hideTransformOptions?: string;
  hideTransitionOptions?: string;
  rtl?: boolean;
}

export interface ConfirmOptions extends $Confirmation {
  defaultFocus?: DefaultFocus;
  acceptButtonProps?: ButtonProps;
  rejectButtonProps?: ButtonProps;
  closeButtonProps?: ButtonProps;
  position?: DialogPosition;
  style?: CssObject;
  styleClass?: string;
  rtl?: boolean;
}

interface DialogBase {
  header?: string;
  draggable?: boolean;
  resizable?: boolean;
  positionLeft?: number;
  positionTop?: number;
  contentStyle?: CssObject;
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
  maskStyle?: CssObject;
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
  closeButtonProps?: ButtonProps;
  maximizeButtonProps?: ButtonProps;
  visible?: boolean;
  style?: any;
  position?: DialogPosition;
  headerTemplate?: TemplateRef<any>;
  contentTemplate?: TemplateRef<any>;
  footerTemplate?: TemplateRef<any>;
  closeIconTemplate?: TemplateRef<any>;
  maximizeIconTemplate?: TemplateRef<any>;
  minimizeIconTemplate?: TemplateRef<any>;
  headlessTemplate?: TemplateRef<any>;
  onShow?: () => any;
  onHide?: () => any;
  visibleChange?: (event: any) => any;
  onResizeInit?: (event: any) => any;
  onResizeEnd?: (event: any) => any;
  onDragEnd?: (event: any) => any;
  onMaximize?: (event: any) => any;
}

export interface DialogOptions extends DialogBase {
  buttonProps?: ButtonProps;
  content?: string;
}

export interface DialogFormOptions extends DialogBase {
  containerStyleClass?: string;
  containerStyle?: CssObject;
  defaultFocus?: DefaultFocus;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  acceptButtonProps?: ButtonProps;
  rejectButtonProps?: ButtonProps;
  submitDisabled?: boolean | ((dialogFormEvent?: DialogFormEvent) => boolean);
  formValidator?: {
    type: string,
    validator: ValidatorFn,
    message: string,
    style?: CssObject
  };
}

export interface DialogFormResult {
  formValue: any;
  finalizeSubmit: (hide?: boolean) => void
}

export interface DialogFormValidation {
  type: ValidationType | string;
  validator: ValidatorFn;
  message: string | ((control: AbstractControl) => string);
}

export interface DialogFormEvent {
  event?: any,
  form?: FormGroup;
  currentConfig?: DialogFormConfig;
  allConfig?: DialogFormConfig[];
}

export type DialogFormComponentName =
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

export interface DialogFormConfig {
  ///////////////////////////////////////// auto-complete /////////////////////////////////////////
  suggestions?: any[];
  dropdown?: boolean;
  minlength?: number;
  delay?: number;
  completeOnFocus?: boolean;
  autoHighlight?: boolean;
  showEmptyMessage?: boolean;
  forceSelection?: boolean;
  dropdownMode?: AutoCompleteDropdownMode;
  unique?: boolean;
  autocomplete?: string;
  completeMethod?: (dialogFormEvent?: DialogFormEvent) => void;
  onUnselect?: (dialogFormEvent?: DialogFormEvent) => void;
  onDropdownClick?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// button /////////////////////////////////////////
  appearance?: ButtonAppearance;
  rounded?: boolean;
  raised?: boolean;
  full?: boolean;
  badgeSeverity?: Severity;
  newLabel?: string;
  newIcon?: string;
  newAppearance?: ButtonAppearance;
  newSeverity?: Severity;
  state?: ButtonState;
  badge?: string;
  badgeClass?: string;
  defaultStateChange?: (dialogFormEvent?: DialogFormEvent) => void;
  onClickAsync?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// cascade-select /////////////////////////////////////////
  onGroupChange?: (dialogFormEvent?: DialogFormEvent) => void;
  onBeforeShow?: (dialogFormEvent?: DialogFormEvent) => void;
  onBeforeHide?: (dialogFormEvent?: DialogFormEvent) => void;
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
  onAdd?: (dialogFormEvent?: DialogFormEvent) => void;
  onChipClick?: (dialogFormEvent?: DialogFormEvent) => void;
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
  localStorageConfig?: any;
  created?: (dialogFormEvent?: DialogFormEvent) => void;
  onload?: (dialogFormEvent?: DialogFormEvent) => void;
  onMouseDown?: (dialogFormEvent?: DialogFormEvent) => void;
  onResizeEditor?: (dialogFormEvent?: DialogFormEvent) => void;
  onAudioUploadBefore?: (dialogFormEvent?: DialogFormEvent) => void;
  onVideoUploadError?: (dialogFormEvent?: DialogFormEvent) => void;
  onVideoUploadBefore?: (dialogFormEvent?: DialogFormEvent) => void;
  onImageUploadError?: (dialogFormEvent?: DialogFormEvent) => void;
  onImageUploadBefore?: (dialogFormEvent?: DialogFormEvent) => void;
  onAudioUploadError?: (dialogFormEvent?: DialogFormEvent) => void;
  onDrop?: (dialogFormEvent?: DialogFormEvent) => void;
  showController?: (dialogFormEvent?: DialogFormEvent) => void;
  toggleFullScreen?: (dialogFormEvent?: DialogFormEvent) => void;
  toggleCodeView?: (dialogFormEvent?: DialogFormEvent) => void;
  showInline?: (dialogFormEvent?: DialogFormEvent) => void;
  onAudioUpload?: (dialogFormEvent?: DialogFormEvent) => void;
  onVideoUpload?: (dialogFormEvent?: DialogFormEvent) => void;
  onImageUpload?: (dialogFormEvent?: DialogFormEvent) => void;
  onCut?: (dialogFormEvent?: DialogFormEvent) => void;
  onCopy?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// file-picker /////////////////////////////////////////
  name?: string;
  url?: string;
  method?: FilePickerMethod;
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
  onProgress?: (dialogFormEvent?: DialogFormEvent) => void;
  onBeforeUpload?: (dialogFormEvent?: DialogFormEvent) => void;
  onUpload?: (dialogFormEvent?: DialogFormEvent) => void;
  onSend?: (dialogFormEvent?: DialogFormEvent) => void;
  uploadHandler?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// file-picker2 /////////////////////////////////////////
  accept?: string;
  fileLimit?: number;
  resultType?: FileResultType;
  chooseLabel?: string;
  onRemove?: (dialogFormEvent?: DialogFormEvent) => void;
  isUnknownImageUrl?: boolean;
  ///////////////////////////////////////// datepicker /////////////////////////////////////////
  defaultDate?: Date | Moment;
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
  minDate?: Date | Moment;
  maxDate?: Date | Moment;
  disabledDates?: any[];
  disabledDays?: any[];
  showTime?: boolean;
  hourFormat?: DatepickerHourFormat;
  timeOnly?: boolean;
  timeSeparator?: string;
  dataType?: DatepickerDateType;
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
  view?: DatepickerViewMode;
  multipleSeparator?: string;
  rangeSeparator?: string;
  touchUI?: boolean;
  focusTrap?: boolean;
  firstDayOfWeek?: number;
  onSelect?: (dialogFormEvent?: DialogFormEvent) => void;
  onClose?: (dialogFormEvent?: DialogFormEvent) => void;
  onClickOutside?: (dialogFormEvent?: DialogFormEvent) => void;
  onTodayClick?: (dialogFormEvent?: DialogFormEvent) => void;
  onClearClick?: (dialogFormEvent?: DialogFormEvent) => void;
  onMonthChange?: (dialogFormEvent?: DialogFormEvent) => void;
  onYearChange?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// image /////////////////////////////////////////
  src?: string;
  alt?: string;
  width?: string;
  preview?: boolean;
  pinchTransitionDuration?: number;
  pinchDoubleTap?: boolean;
  pinchDoubleTapScale?: number;
  pinchAutoZoomOut?: boolean;
  pinchLimitZoom?: PinchLimitZoom;
  pinchDisabled?: boolean;
  pinchDisablePan?: boolean;
  pinchOverflow?: PinchOverflow;
  pinchZoomControlScale?: number;
  pinchDisableZoomControl?: PinchDisableZoomControl;
  pinchLimitPan?: boolean;
  pinchMinPanScale?: number;
  pinchMinScale?: number;
  pinchListeners?: PinchListener;
  pinchWheel?: boolean;
  pinchAutoHeight?: boolean;
  pinchWheelZoomFactor?: number;
  pinchDraggableImage?: boolean;
  previewStyle?: CssObject;
  previewStyleClass?: string;
  imageStyle?: CssObject;
  imageStyleClass?: string;
  previewImageStyle?: CssObject;
  previewImageStyleClass?: string;
  errorPlaceholderSrc?: string;
  onImageError?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// input-mask /////////////////////////////////////////
  mask?: string;
  slotChar?: string;
  autoClear?: boolean;
  unmask?: boolean;
  characterPattern?: string;
  autoFocus?: boolean;
  onComplete?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// input-number /////////////////////////////////////////
  showButtons?: boolean;
  buttonLayout?: NumberButtonLayout;
  incrementButtonClass?: string;
  decrementButtonClass?: string;
  incrementButtonIcon?: string;
  decrementButtonIcon?: string;
  locale?: string;
  localeMatcher?: NumberLocaleMatcher;
  prefix?: string;
  suffix?: string;
  currency?: Currency;
  currencyDisplay?: CurrencyDisplay;
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
  inputStyle?: CssObject;
  inputStyleClass?: string;
  ///////////////////////////////////////// input-text /////////////////////////////////////////
  keyFilter?: KeyFilter | RegExp;
  inputMode?: InputMode;
  onPaste?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// input-textarea /////////////////////////////////////////
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxlength?: number;
  onResize?: (dialogFormEvent?: DialogFormEvent) => void;
  onInput?: (dialogFormEvent?: DialogFormEvent) => void;
  onKeyDown?: (dialogFormEvent?: DialogFormEvent) => void;
  onKeyUp?: (dialogFormEvent?: DialogFormEvent) => void;
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
  listStyle?: CssObject;
  listStyleClass?: string;
  onDblClick?: (dialogFormEvent?: DialogFormEvent) => void;
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
  zoomChange?: (dialogFormEvent?: DialogFormEvent) => void;
  centerChange?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMarkerClick?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapClick?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapDoubleClick?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMouseDown?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMouseUp?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMouseMove?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMouseOver?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMouseOut?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMove?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMoveStart?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapMoveEnd?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapZoom?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapZoomStart?: (dialogFormEvent?: DialogFormEvent) => void;
  onMapZoomEnd?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// message /////////////////////////////////////////
  inlineMessage?: string;
  summary?: string;
  detail?: string;
  severity?: Severity;
  closable?: boolean;
  ///////////////////////////////////////// multi-select /////////////////////////////////////////
  autofocusFilter?: boolean;
  autoZIndex?: boolean;
  baseZIndex?: number;
  defaultLabel?: string;
  displaySelectedLabel?: boolean;
  dropdownIcon?: string;
  emptyFilterMessage?: string;
  filterMatchMode?: FilterMatchMode;
  filterValue?: string;
  hideTransitionOptions?: string;
  itemSize?: number;
  maxSelectedLabels?: number;
  optionGroupLabel?: string;
  optionGroupChildren?: any;
  group?: boolean;
  overlayVisible?: boolean;
  panelStyle?: CssObject;
  selectedItemsLabel?: string | 'ellipsis';
  selectionLimit?: number;
  showHeader?: boolean;
  showTransitionOptions?: string;
  showToggleAll?: boolean;
  tooltip?: any;
  tooltipStyleClass?: string;
  tooltipPosition?: Position;
  tooltipPositionStyle?: string;
  onClick?: (dialogFormEvent?: DialogFormEvent) => void;
  onPanelShow?: (dialogFormEvent?: DialogFormEvent) => void;
  onPanelHide?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// radio /////////////////////////////////////////
  onFocus?: (dialogFormEvent?: DialogFormEvent) => void;
  onBlur?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// rating /////////////////////////////////////////
  stars?: number;
  cancel?: boolean;
  iconOnClass?: string;
  iconOffClass?: string;
  iconCancelClass?: string;
  iconOnStyle?: CssObject;
  iconOffStyle?: CssObject;
  iconCancelStyle?: CssObject;
  onRate?: (dialogFormEvent?: DialogFormEvent) => void;
  onCancel?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// select-button /////////////////////////////////////////
  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string;
  multiple?: boolean;
  dataKey?: string;
  onOptionClick?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// slider /////////////////////////////////////////
  animate?: boolean;
  min?: number;
  max?: number;
  orientation?: Orientation;
  step?: number;
  range?: boolean;
  onSlideEnd?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// toggle-switch /////////////////////////////////////////
  async?: boolean;
  showAsyncLoading?: boolean;
  trueValue?: any;
  falseValue?: any;
  onChangeAsync?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// toggle-button /////////////////////////////////////////
  onLabel?: string;
  offLabel?: string;
  onIcon?: string;
  offIcon?: string;
  onChange?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// tree /////////////////////////////////////////
  items?: any[];
  selection?: any;
  contextMenu?: $ContextMenu;
  layout?: Orientation;
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
  onNodeContextMenuSelect?: (dialogFormEvent?: DialogFormEvent) => void;
  onNodeDrop?: (dialogFormEvent?: DialogFormEvent) => void;
  onLazyLoad?: (dialogFormEvent?: DialogFormEvent) => void;
  onScroll?: (dialogFormEvent?: DialogFormEvent) => void;
  onScrollIndexChange?: (dialogFormEvent?: DialogFormEvent) => void;
  selectionChange?: (dialogFormEvent?: DialogFormEvent) => void;
  ///////////////////////////////////////// tree-select /////////////////////////////////////////
  labelWidth?: number;
  icon?: string;
  iconPos?: Position;
  scrollHeight?: string;
  placeholder?: string;
  panelClass?: string;
  appendTo?: string;
  emptyMessage?: string;
  display?: ChipDisplayMode;
  propagateSelectionUp?: boolean;
  propagateSelectionDown?: boolean;
  metaKeySelection?: boolean;
  filter?: boolean;
  filterBy?: string;
  filterMode?: TreeFilterMode;
  filterPlaceHolder?: string;
  filterLocale?: string;
  resetFilterOnHide?: boolean;
  showClear?: boolean;
  onShow?: (dialogFormEvent?: DialogFormEvent) => void;
  onHide?: (dialogFormEvent?: DialogFormEvent) => void;
  onFilter?: (dialogFormEvent?: DialogFormEvent) => void;
  onNodeSelect?: (dialogFormEvent?: DialogFormEvent) => void;
  onNodeUnselect?: (dialogFormEvent?: DialogFormEvent) => void;
  onNodeExpand?: (dialogFormEvent?: DialogFormEvent) => void;
  onNodeCollapse?: (dialogFormEvent?: DialogFormEvent) => void;
  onClear?: (dialogFormEvent?: DialogFormEvent) => void;
  value?: any;
  label?: string;
  variant?: InputVariant;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  disabled?: boolean | ((dialogFormEvent?: DialogFormEvent) => boolean);
  tabindex?: any;
  style?: CssObject;
  styleClass?: string;
  readonly?: boolean;
  checkboxTrueIcon?: string;
  checkboxFalseIcon?: string;
  size?: Size | number;
  type?: ButtonType | InputType;
  format?: ColorFormat | boolean;
  mode?: FilePickerMode | NumberMode;
  selectionMode?: DatepickerSelectionMode | TreeSelectionMode;
  labelPosition?: LabelPosition;
  options?: SunEditorOptions | any[];

  // out of components
  template?: string;
  validations?: DialogFormValidation[];
  component: DialogFormComponentName;
  key?: string;
  className?: string | string[];
  hidden?: boolean | ((dialogFormEvent?: DialogFormEvent) => boolean);
}

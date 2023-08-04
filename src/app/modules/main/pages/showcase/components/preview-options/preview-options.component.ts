import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  NgAddon,
  NgButtonAppearance,
  NgColor,
  NgColorFormat,
  NgConfigChangeEvent,
  NgCurrency,
  NgCurrencyDisplay,
  NgDatepickerSelectionMode,
  NgDatepickerViewMode,
  NgDefaultFocus,
  NgDialogPosition,
  NgDisableZoomControl,
  NgFilePickerMode,
  NgFixLabelPosition,
  NgIconPosition,
  NgInputType,
  NgKeyFilter,
  NgLabelPosition,
  NgLimitZoom,
  NgListener,
  NgNumberButtonLayout,
  NgNumberMode,
  NgOrientation,
  NgOverflow,
  NgSeverity,
  NgSize,
  NgStatusIcon,
  NgToastPosition,
  NgTreeSelectionMode
} from '@powell/models';
import {DropdownComponent} from '@powell/components/dropdown';
import {InputTextComponent} from '@powell/components/input-text';
import {CheckboxComponent} from '@powell/components/checkbox';
import {DestroyService, TranslationService} from "@core/utils";
import {takeUntil} from "rxjs";
import {ConfigService} from "@powell/api";

type PreviewItem =
  | 'label'
  | 'filled'
  | 'labelWidth'
  | 'hint'
  | 'rtl'
  | 'icon'
  | 'labelPos'
  | 'iconPos'
  | 'scrollHeight'
  | 'dropdown'
  | 'multiple'
  | 'minlength'
  | 'placeholder'
  | 'readonly'
  | 'disabled'
  | 'maxlength'
  | 'showEmptyMessage'
  | 'emptyMessage'
  | 'forceSelection'
  | 'unique'
  | 'showClear'
  | 'full'
  | 'badge'
  | 'rounded'
  | 'raised'
  | 'appearance'
  | 'color'
  | 'newLabel'
  | 'newColor'
  | 'badgeColor'
  | 'max'
  | 'allowDuplicate'
  | 'addOnTab'
  | 'addOnBlur'
  | 'inline'
  | 'filter'
  | 'emptyFilterMessage'
  | 'editable'
  | 'autofocusFilter'
  | 'resetFilterOnHide'
  | 'autoDisplayFirst'
  | 'accept'
  | 'auto'
  | 'maxFileSize'
  | 'fileLimit'
  | 'previewWidth'
  | 'chooseLabel'
  | 'uploadLabel'
  | 'cancelLabel'
  | 'chooseIcon'
  | 'uploadIcon'
  | 'cancelIcon'
  | 'showUploadButton'
  | 'showCancelButton'
  | 'numVisible'
  | 'showItemNavigators'
  | 'showThumbnailNavigators'
  | 'showItemNavigatorsOnHover'
  | 'changeItemOnIndicatorHover'
  | 'circular'
  | 'autoPlay'
  | 'transitionInterval'
  | 'showThumbnails'
  | 'thumbnailsPosition'
  | 'verticalThumbnailViewPortHeight'
  | 'showIndicators'
  | 'showIndicatorsOnItem'
  | 'indicatorsPosition'
  | 'mask'
  | 'slotChar'
  | 'autoClear'
  | 'unmask'
  | 'characterPattern'
  | 'showButtons'
  | 'buttonLayout'
  | 'prefix'
  | 'suffix'
  | 'currency'
  | 'currencyDisplay'
  | 'useGrouping'
  | 'min'
  | 'step'
  | 'allowEmpty'
  | 'promptLabel'
  | 'weakLabel'
  | 'mediumLabel'
  | 'strongLabel'
  | 'feedback'
  | 'toggleMask'
  | 'type'
  | 'keyFilter'
  | 'rows'
  | 'cols'
  | 'autoResize'
  | 'valueColor'
  | 'rangeColor'
  | 'textColor'
  | 'strokeWidth'
  | 'showValue'
  | 'valueTemplate'
  | 'checkbox'
  | 'filterPlaceHolder'
  | 'showToggleAll'
  | 'orientation'
  | 'defaultLabel'
  | 'displaySelectedLabel'
  | 'maxSelectedLabels'
  | 'overlayVisible'
  | 'selectedItemsLabel'
  | 'selectionLimit'
  | 'showHeader'
  | 'display'
  | 'stars'
  | 'cancel'
  | 'iconOnClass'
  | 'iconOffClass'
  | 'iconCancelClass'
  | 'animate'
  | 'range'
  | 'onLabel'
  | 'offLabel'
  | 'onIcon'
  | 'offIcon'
  | 'showOtherMonths'
  | 'selectOtherMonths'
  | 'gridlines'
  | 'striped'
  | 'clearMarkerOnClick'
  | 'showIcon'
  | 'showOnFocus'
  | 'showWeek'
  | 'datePickerIcon'
  | 'readonlyInput'
  | 'shortYearCutoff'
  | 'showTime'
  | 'hourFormat'
  | 'timeOnly'
  | 'showSeconds'
  | 'stepHour'
  | 'stepMinute'
  | 'stepSecond'
  | 'showButtonBar'
  | 'hideOnDateTimeSelect'
  | 'numberOfMonths'
  | 'view'
  | 'touchUI'
  | 'selectionMode'
  | 'propagateSelectionUp'
  | 'propagateSelectionDown'
  | 'indentation'
  | 'layout'
  | 'status'
  | 'text'
  | 'subText'
  | 'imageType'
  | 'width'
  | 'height'
  | 'preview'
  | 'pinchTransitionDuration'
  | 'pinchDoubleTap'
  | 'pinchDoubleTapScale'
  | 'pinchAutoZoomOut'
  | 'pinchLimitZoom'
  | 'pinchDisabled'
  | 'pinchDisablePan'
  | 'pinchOverflow'
  | 'pinchZoomControlScale'
  | 'pinchDisableZoomControl'
  | 'pinchLimitPan'
  | 'pinchMinPanScale'
  | 'pinchMinScale'
  | 'pinchListeners'
  | 'pinchWheel'
  | 'pinchAutoHeight'
  | 'pinchWheelZoomFactor'
  | 'pinchDraggableImage'
  | 'closable'
  | 'header'
  | 'acceptLabel'
  | 'rejectLabel'
  | 'acceptIcon'
  | 'rejectIcon'
  | 'acceptVisible'
  | 'rejectVisible'
  | 'acceptColor'
  | 'acceptAppearance'
  | 'buttonSize'
  | 'rejectColor'
  | 'rejectAppearance'
  | 'closeOnEscape'
  | 'dismissableMask'
  | 'defaultFocus'
  | 'blockScroll'
  | 'draggable'
  | 'resizable'
  | 'modal'
  | 'dialogPosition'
  | 'toastPosition'
  | 'maximizable'
  | 'buttonIcon'
  | 'buttonIconPos'
  | 'buttonFull'
  | 'buttonLabel'
  | 'buttonColor'
  | 'buttonAppearance'
  | 'content'
  | 'inlineMessage'
  | 'severity'
  | 'life'
  | 'sticky'
  | 'summary'
  | 'detail'
  | 'preventDuplicates'
  | 'async'
  | 'dismissible'
  | 'showCloseIcon'
  | 'inputCount'
  | 'numbersOnly'
  | 'disableConfigChangeEffect'
  | 'showRequiredStar'

  | 'addon'
  | 'selectiveSize'
  | 'numericSize'
  | 'colorFormat'
  | 'enableFormat'
  | 'filePickerMode'
  | 'datepickerSelectionMode'
  | 'numberMode'
  | 'fixLabelPos';

@Component({
  selector: 'ng-preview-options',
  templateUrl: './preview-options.component.html',
  styleUrls: ['./preview-options.component.scss'],
  providers: [DestroyService]
})
export class PreviewOptionsComponent implements OnInit {
  @Input() label: string;
  @Output() labelChange = new EventEmitter()
  @Input() filled: boolean;
  @Output() filledChange = new EventEmitter()
  @Input() labelWidth: number;
  @Output() labelWidthChange = new EventEmitter()
  @Input() hint: string;
  @Output() hintChange = new EventEmitter()
  @Input() rtl: boolean;
  @Output() rtlChange = new EventEmitter()
  @Input() icon: string;
  @Output() iconChange = new EventEmitter()
  @Input() labelPos: NgLabelPosition;
  @Output() labelPosChange = new EventEmitter()
  @Input() iconPos: NgIconPosition;
  @Output() iconPosChange = new EventEmitter()
  @Input() scrollHeight: string;
  @Output() scrollHeightChange = new EventEmitter()
  @Input() dropdown: boolean;
  @Output() dropdownChange = new EventEmitter()
  @Input() multiple: boolean;
  @Output() multipleChange = new EventEmitter()
  @Input() minlength: number;
  @Output() minlengthChange = new EventEmitter()
  @Input() placeholder: string;
  @Output() placeholderChange = new EventEmitter()
  @Input() readonly: boolean;
  @Output() readonlyChange = new EventEmitter()
  @Input() disabled: boolean;
  @Output() disabledChange = new EventEmitter()
  @Input() maxlength: number;
  @Output() maxlengthChange = new EventEmitter()
  @Input() showEmptyMessage: boolean;
  @Output() showEmptyMessageChange = new EventEmitter()
  @Input() emptyMessage: string;
  @Output() emptyMessageChange = new EventEmitter()
  @Input() forceSelection: boolean;
  @Output() forceSelectionChange = new EventEmitter()
  @Input() unique: boolean;
  @Output() uniqueChange = new EventEmitter()
  @Input() showClear: boolean;
  @Output() showClearChange = new EventEmitter()
  @Input() full: boolean;
  @Output() fullChange = new EventEmitter()
  @Input() badge: string;
  @Output() badgeChange = new EventEmitter()
  @Input() rounded: boolean;
  @Output() roundedChange = new EventEmitter()
  @Input() raised: boolean;
  @Output() raisedChange = new EventEmitter()
  @Input() appearance: NgButtonAppearance;
  @Output() appearanceChange = new EventEmitter()
  @Input() color: NgColor;
  @Output() colorChange = new EventEmitter()
  @Input() newLabel: string;
  @Output() newLabelChange = new EventEmitter()
  @Input() newColor: NgColor;
  @Output() newColorChange = new EventEmitter()
  @Input() badgeColor: NgColor;
  @Output() badgeColorChange = new EventEmitter()
  @Input() max: number;
  @Output() maxChange = new EventEmitter()
  @Input() allowDuplicate: boolean;
  @Output() allowDuplicateChange = new EventEmitter()
  @Input() addOnTab: boolean;
  @Output() addOnTabChange = new EventEmitter()
  @Input() addOnBlur: boolean;
  @Output() addOnBlurChange = new EventEmitter()
  @Input() inline: boolean;
  @Output() inlineChange = new EventEmitter()
  @Input() filter: boolean;
  @Output() filterChange = new EventEmitter()
  @Input() emptyFilterMessage: string;
  @Output() emptyFilterMessageChange = new EventEmitter()
  @Input() editable: boolean;
  @Output() editableChange = new EventEmitter()
  @Input() autofocusFilter: boolean;
  @Output() autofocusFilterChange = new EventEmitter()
  @Input() resetFilterOnHide: boolean;
  @Output() resetFilterOnHideChange = new EventEmitter()
  @Input() autoDisplayFirst: boolean;
  @Output() autoDisplayFirstChange = new EventEmitter()
  @Input() accept: string;
  @Output() acceptChange = new EventEmitter()
  @Input() auto: boolean;
  @Output() autoChange = new EventEmitter()
  @Input() maxFileSize: number;
  @Output() maxFileSizeChange = new EventEmitter()
  @Input() fileLimit: number;
  @Output() fileLimitChange = new EventEmitter()
  @Input() previewWidth: number;
  @Output() previewWidthChange = new EventEmitter()
  @Input() chooseLabel: string;
  @Output() chooseLabelChange = new EventEmitter()
  @Input() uploadLabel: string;
  @Output() uploadLabelChange = new EventEmitter()
  @Input() cancelLabel: string;
  @Output() cancelLabelChange = new EventEmitter()
  @Input() chooseIcon: string;
  @Output() chooseIconChange = new EventEmitter()
  @Input() uploadIcon: string;
  @Output() uploadIconChange = new EventEmitter()
  @Input() cancelIcon: string;
  @Output() cancelIconChange = new EventEmitter()
  @Input() showUploadButton: boolean;
  @Output() showUploadButtonChange = new EventEmitter()
  @Input() showCancelButton: boolean;
  @Output() showCancelButtonChange = new EventEmitter()
  @Input() numVisible: number;
  @Output() numVisibleChange = new EventEmitter()
  @Input() showItemNavigators: boolean;
  @Output() showItemNavigatorsChange = new EventEmitter()
  @Input() showThumbnailNavigators: boolean;
  @Output() showThumbnailNavigatorsChange = new EventEmitter()
  @Input() showItemNavigatorsOnHover: boolean;
  @Output() showItemNavigatorsOnHoverChange = new EventEmitter()
  @Input() changeItemOnIndicatorHover: boolean;
  @Output() changeItemOnIndicatorHoverChange = new EventEmitter()
  @Input() circular: boolean;
  @Output() circularChange = new EventEmitter()
  @Input() autoPlay: boolean;
  @Output() autoPlayChange = new EventEmitter()
  @Input() transitionInterval: number;
  @Output() transitionIntervalChange = new EventEmitter()
  @Input() showThumbnails: boolean;
  @Output() showThumbnailsChange = new EventEmitter()
  @Input() thumbnailsPosition: string;
  @Output() thumbnailsPositionChange = new EventEmitter()
  @Input() verticalThumbnailViewPortHeight: string;
  @Output() verticalThumbnailViewPortHeightChange = new EventEmitter()
  @Input() showIndicators: boolean;
  @Output() showIndicatorsChange = new EventEmitter()
  @Input() showIndicatorsOnItem: boolean;
  @Output() showIndicatorsOnItemChange = new EventEmitter()
  @Input() indicatorsPosition: string;
  @Output() indicatorsPositionChange = new EventEmitter()
  @Input() mask: string;
  @Output() maskChange = new EventEmitter()
  @Input() slotChar: string;
  @Output() slotCharChange = new EventEmitter()
  @Input() autoClear: boolean;
  @Output() autoClearChange = new EventEmitter()
  @Input() unmask: boolean;
  @Output() unmaskChange = new EventEmitter()
  @Input() characterPattern: string;
  @Output() characterPatternChange = new EventEmitter()
  @Input() showButtons: boolean;
  @Output() showButtonsChange = new EventEmitter()
  @Input() buttonLayout: NgNumberButtonLayout;
  @Output() buttonLayoutChange = new EventEmitter()
  @Input() prefix: string;
  @Output() prefixChange = new EventEmitter()
  @Input() suffix: string;
  @Output() suffixChange = new EventEmitter()
  @Input() currency: NgCurrency;
  @Output() currencyChange = new EventEmitter()
  @Input() currencyDisplay: NgCurrencyDisplay;
  @Output() currencyDisplayChange = new EventEmitter()
  @Input() useGrouping: boolean;
  @Output() useGroupingChange = new EventEmitter()
  @Input() min: number;
  @Output() minChange = new EventEmitter()
  @Input() step: number;
  @Output() stepChange = new EventEmitter()
  @Input() allowEmpty: boolean;
  @Output() allowEmptyChange = new EventEmitter()
  @Input() promptLabel: string;
  @Output() promptLabelChange = new EventEmitter()
  @Input() weakLabel: string;
  @Output() weakLabelChange = new EventEmitter()
  @Input() mediumLabel: string;
  @Output() mediumLabelChange = new EventEmitter()
  @Input() strongLabel: string;
  @Output() strongLabelChange = new EventEmitter()
  @Input() feedback: boolean;
  @Output() feedbackChange = new EventEmitter()
  @Input() toggleMask: boolean;
  @Output() toggleMaskChange = new EventEmitter()
  @Input() type: NgInputType;
  @Output() typeChange = new EventEmitter()
  @Input() keyFilter: NgKeyFilter | RegExp;
  @Output() keyFilterChange = new EventEmitter()
  @Input() rows: number;
  @Output() rowsChange = new EventEmitter()
  @Input() cols: number;
  @Output() colsChange = new EventEmitter()
  @Input() autoResize: boolean;
  @Output() autoResizeChange = new EventEmitter()
  @Input() valueColor: string;
  @Output() valueColorChange = new EventEmitter()
  @Input() rangeColor: string;
  @Output() rangeColorChange = new EventEmitter()
  @Input() textColor: string;
  @Output() textColorChange = new EventEmitter()
  @Input() strokeWidth: number;
  @Output() strokeWidthChange = new EventEmitter()
  @Input() showValue: boolean;
  @Output() showValueChange = new EventEmitter()
  @Input() valueTemplate: string;
  @Output() valueTemplateChange = new EventEmitter()
  @Input() checkbox: boolean;
  @Output() checkboxChange = new EventEmitter()
  @Input() filterPlaceHolder: string;
  @Output() filterPlaceHolderChange = new EventEmitter()
  @Input() showToggleAll: boolean;
  @Output() showToggleAllChange = new EventEmitter()
  @Input() orientation: NgOrientation;
  @Output() orientationChange = new EventEmitter()
  @Input() defaultLabel: string;
  @Output() defaultLabelChange = new EventEmitter()
  @Input() displaySelectedLabel: boolean;
  @Output() displaySelectedLabelChange = new EventEmitter()
  @Input() maxSelectedLabels: number;
  @Output() maxSelectedLabelsChange = new EventEmitter()
  @Input() overlayVisible: boolean;
  @Output() overlayVisibleChange = new EventEmitter()
  @Input() selectedItemsLabel: string;
  @Output() selectedItemsLabelChange = new EventEmitter()
  @Input() selectionLimit: number;
  @Output() selectionLimitChange = new EventEmitter()
  @Input() showHeader: boolean;
  @Output() showHeaderChange = new EventEmitter()
  @Input() gridlines: boolean;
  @Output() gridlinesChange = new EventEmitter()
  @Input() striped: boolean;
  @Output() stripedChange = new EventEmitter()
  @Input() display: string;
  @Output() displayChange = new EventEmitter()
  @Input() clearMarkerOnClick: boolean;
  @Output() clearMarkerOnClickChange = new EventEmitter()
  @Input() stars: number;
  @Output() starsChange = new EventEmitter()
  @Input() cancel: boolean;
  @Output() cancelChange = new EventEmitter()
  @Input() iconOnClass: string;
  @Output() iconOnClassChange = new EventEmitter()
  @Input() iconOffClass: string;
  @Output() iconOffClassChange = new EventEmitter()
  @Input() iconCancelClass: string;
  @Output() iconCancelClassChange = new EventEmitter()
  @Input() animate: boolean;
  @Output() animateChange = new EventEmitter()
  @Input() range: boolean;
  @Output() rangeChange = new EventEmitter()
  @Input() onLabel: string;
  @Output() onLabelChange = new EventEmitter()
  @Input() offLabel: string;
  @Output() offLabelChange = new EventEmitter()
  @Input() onIcon: string;
  @Output() onIconChange = new EventEmitter()
  @Input() offIcon: string;
  @Output() offIconChange = new EventEmitter()
  @Input() showOtherMonths: boolean;
  @Output() showOtherMonthsChange = new EventEmitter()
  @Input() selectOtherMonths: boolean;
  @Output() selectOtherMonthsChange = new EventEmitter()
  @Input() showIcon: boolean;
  @Output() showIconChange = new EventEmitter()
  @Input() showOnFocus: boolean;
  @Output() showOnFocusChange = new EventEmitter()
  @Input() showWeek: boolean;
  @Output() showWeekChange = new EventEmitter()
  @Input() datePickerIcon: string;
  @Output() datePickerIconChange = new EventEmitter()
  @Input() readonlyInput: boolean;
  @Output() readonlyInputChange = new EventEmitter()
  @Input() shortYearCutoff: string;
  @Output() shortYearCutoffChange = new EventEmitter()
  @Input() showTime: boolean;
  @Output() showTimeChange = new EventEmitter()
  @Input() timeOnly: boolean;
  @Output() timeOnlyChange = new EventEmitter()
  @Input() showSeconds: boolean;
  @Output() showSecondsChange = new EventEmitter()
  @Input() stepHour: number;
  @Output() stepHourChange = new EventEmitter()
  @Input() stepMinute: number;
  @Output() stepMinuteChange = new EventEmitter()
  @Input() stepSecond: number;
  @Output() stepSecondChange = new EventEmitter()
  @Input() showButtonBar: boolean;
  @Output() showButtonBarChange = new EventEmitter()
  @Input() hideOnDateTimeSelect: boolean;
  @Output() hideOnDateTimeSelectChange = new EventEmitter()
  @Input() numberOfMonths: number;
  @Output() numberOfMonthsChange = new EventEmitter()
  @Input() view: NgDatepickerViewMode;
  @Output() viewChange = new EventEmitter()
  @Input() touchUI: boolean;
  @Output() touchUIChange = new EventEmitter()
  @Input() hourFormat: string;
  @Output() hourFormatChange = new EventEmitter()
  @Input() selectionMode: NgTreeSelectionMode;
  @Output() selectionModeChange = new EventEmitter();
  @Input() propagateSelectionUp: boolean;
  @Output() propagateSelectionUpChange = new EventEmitter();
  @Input() propagateSelectionDown: boolean;
  @Output() propagateSelectionDownChange = new EventEmitter();
  @Input() indentation: number;
  @Output() indentationChange = new EventEmitter();
  @Input() layout: NgOrientation;
  @Output() layoutChange = new EventEmitter();
  @Input() status: NgStatusIcon;
  @Output() statusChange = new EventEmitter()
  @Input() text: string;
  @Output() textChange = new EventEmitter()
  @Input() subText: string;
  @Output() subTextChange = new EventEmitter()
  @Input() imageType: string;
  @Output() imageTypeChange = new EventEmitter()
  @Input() width: string;
  @Output() widthChange = new EventEmitter();
  @Input() height: string;
  @Output() heightChange = new EventEmitter();
  @Input() preview: boolean;
  @Output() previewChange = new EventEmitter();
  @Input() pinchTransitionDuration: number;
  @Output() pinchTransitionDurationChange = new EventEmitter();
  @Input() pinchDoubleTap: boolean;
  @Output() pinchDoubleTapChange = new EventEmitter();
  @Input() pinchDoubleTapScale: number;
  @Output() pinchDoubleTapScaleChange = new EventEmitter();
  @Input() pinchAutoZoomOut: boolean;
  @Output() pinchAutoZoomOutChange = new EventEmitter();
  @Input() pinchLimitZoom: NgLimitZoom;
  @Output() pinchLimitZoomChange = new EventEmitter();
  @Input() pinchDisabled: boolean;
  @Output() pinchDisabledChange = new EventEmitter();
  @Input() pinchDisablePan: boolean;
  @Output() pinchDisablePanChange = new EventEmitter();
  @Input() pinchOverflow: NgOverflow;
  @Output() pinchOverflowChange = new EventEmitter();
  @Input() pinchZoomControlScale: number;
  @Output() pinchZoomControlScaleChange = new EventEmitter();
  @Input() pinchDisableZoomControl: NgDisableZoomControl;
  @Output() pinchDisableZoomControlChange = new EventEmitter();
  @Input() pinchLimitPan: boolean;
  @Output() pinchLimitPanChange = new EventEmitter();
  @Input() pinchMinPanScale: number;
  @Output() pinchMinPanScaleChange = new EventEmitter();
  @Input() pinchMinScale: number;
  @Output() pinchMinScaleChange = new EventEmitter();
  @Input() pinchListeners: NgListener;
  @Output() pinchListenersChange = new EventEmitter();
  @Input() pinchWheel: boolean;
  @Output() pinchWheelChange = new EventEmitter();
  @Input() pinchAutoHeight: boolean;
  @Output() pinchAutoHeightChange = new EventEmitter();
  @Input() pinchWheelZoomFactor: number;
  @Output() pinchWheelZoomFactorChange = new EventEmitter();
  @Input() pinchDraggableImage: boolean;
  @Output() pinchDraggableImageChange = new EventEmitter();
  @Input() closable: boolean;
  @Output() closableChange = new EventEmitter()
  @Input() header: string;
  @Output() headerChange = new EventEmitter()
  @Input() acceptLabel: string;
  @Output() acceptLabelChange = new EventEmitter()
  @Input() rejectLabel: string;
  @Output() rejectLabelChange = new EventEmitter()
  @Input() acceptIcon: string;
  @Output() acceptIconChange = new EventEmitter()
  @Input() rejectIcon: string;
  @Output() rejectIconChange = new EventEmitter()
  @Input() acceptVisible: boolean;
  @Output() acceptVisibleChange = new EventEmitter()
  @Input() rejectVisible: boolean;
  @Output() rejectVisibleChange = new EventEmitter()
  @Input() acceptColor: NgColor;
  @Output() acceptColorChange = new EventEmitter()
  @Input() acceptAppearance: NgButtonAppearance;
  @Output() acceptAppearanceChange = new EventEmitter()
  @Input() buttonSize: NgSize;
  @Output() buttonSizeChange = new EventEmitter()
  @Input() rejectColor: NgColor;
  @Output() rejectColorChange = new EventEmitter()
  @Input() rejectAppearance: NgButtonAppearance;
  @Output() rejectAppearanceChange = new EventEmitter()
  @Input() closeOnEscape: boolean;
  @Output() closeOnEscapeChange = new EventEmitter()
  @Input() dismissableMask: boolean;
  @Output() dismissableMaskChange = new EventEmitter()
  @Input() defaultFocus: NgDefaultFocus;
  @Output() defaultFocusChange = new EventEmitter()
  @Input() blockScroll: boolean;
  @Output() blockScrollChange = new EventEmitter()
  @Input() draggable: boolean;
  @Output() draggableChange = new EventEmitter()
  @Input() resizable: boolean;
  @Output() resizableChange = new EventEmitter()
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter()
  @Input() maximizable: boolean;
  @Output() maximizableChange = new EventEmitter()
  @Input() buttonIcon: string;
  @Output() buttonIconChange = new EventEmitter()
  @Input() buttonIconPos: NgIconPosition;
  @Output() buttonIconPosChange = new EventEmitter()
  @Input() buttonFull: boolean;
  @Output() buttonFullChange = new EventEmitter()
  @Input() buttonLabel: string;
  @Output() buttonLabelChange = new EventEmitter()
  @Input() buttonColor: NgColor;
  @Output() buttonColorChange = new EventEmitter()
  @Input() buttonAppearance: NgButtonAppearance;
  @Output() buttonAppearanceChange = new EventEmitter()
  @Input() content: string;
  @Output() contentChange = new EventEmitter()
  @Input() inlineMessage: string;
  @Output() inlineMessageChange = new EventEmitter()
  @Input() severity: NgSeverity;
  @Output() severityChange = new EventEmitter()
  @Input() life: number;
  @Output() lifeChange = new EventEmitter()
  @Input() sticky: boolean;
  @Output() stickyChange = new EventEmitter()
  @Input() summary: string;
  @Output() summaryChange = new EventEmitter()
  @Input() detail: string;
  @Output() detailChange = new EventEmitter()
  @Input() preventDuplicates: boolean;
  @Output() preventDuplicatesChange = new EventEmitter()
  @Input() async: boolean;
  @Output() asyncChange = new EventEmitter();
  @Input() dismissible: boolean;
  @Output() dismissibleChange = new EventEmitter()
  @Input() showCloseIcon: boolean;
  @Output() showCloseIconChange = new EventEmitter()
  @Input() addon: NgAddon;
  @Output() addonChange = new EventEmitter()
  @Input() inputCount: number;
  @Output() inputCountChange = new EventEmitter();
  @Input() numbersOnly: boolean;
  @Output() numbersOnlyChange = new EventEmitter();
  @Input() disableConfigChangeEffect: boolean;
  @Output() disableConfigChangeEffectChange = new EventEmitter();
  @Input() showRequiredStar: boolean;
  @Output() showRequiredStarChange = new EventEmitter();

  // instead of 'position'
  @Input() dialogPosition: NgDialogPosition;
  @Output() dialogPositionChange = new EventEmitter()
  @Input() toastPosition: NgToastPosition;
  @Output() toastPositionChange = new EventEmitter()
  // instead of 'size' & 'inputSize'
  @Input() selectiveSize: NgSize;
  @Output() selectiveSizeChange = new EventEmitter()
  @Input() numericSize: number;
  @Output() numericSizeChange = new EventEmitter()
  // instead of 'format'
  @Input() colorFormat: NgColorFormat;
  @Output() colorFormatChange = new EventEmitter()
  @Input() enableFormat: boolean;
  @Output() enableFormatChange = new EventEmitter()
  // instead of 'mode'
  @Input() filePickerMode: NgFilePickerMode;
  @Output() filePickerModeChange = new EventEmitter()
  @Input() numberMode: NgNumberMode;
  @Output() numberModeChange = new EventEmitter()
  // instead of 'selectionMode'
  @Input() datepickerSelectionMode: NgDatepickerSelectionMode;
  @Output() datepickerSelectionModeChange = new EventEmitter()
  // instead of 'labelPos'
  @Input() fixLabelPos: NgFixLabelPosition;
  @Output() fixLabelPosChange = new EventEmitter()

  @ViewChild('firstRow', {static: true, read: ViewContainerRef}) firstRow: ViewContainerRef;
  @ViewChild('secondRow', {static: true, read: ViewContainerRef}) secondRow: ViewContainerRef;

  @Input() previewItems: PreviewItem[]

  cmpRefs: ComponentRef<any>[] = [];

  constructor(private translationService: TranslationService,
              private configService: ConfigService,
              private destroy$: DestroyService) {
  }

  ngOnInit() {
    const dropdownData = {
      iconPos: ['left', 'right'],
      display: ['comma', 'chip'],
      appearance: ['basic', 'text', 'outlined', 'link'],
      buttonLayout: ['stacked', 'horizontal', 'vertical'],
      keyFilter: [/.*/g, 'pint', 'int', 'pnum', 'num', 'hex', 'email', 'alpha', 'alphanum'],
      currency: ['USD', 'EUR', 'IRR'],
      currencyDisplay: ['symbol', 'code', 'name'],
      labelPos: ['fix-side', 'fix-top', 'float'],
      selectionMode: ['none', 'single', 'multiple', 'checkbox'],
      orientation: ['horizontal', 'vertical'],
      layout: ['horizontal', 'vertical'],
      dropdownMode: ['blank', 'current'],
      color: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      newColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      badgeColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      hourFormat: ['12', '24'],
      view: ['date', 'month', 'year'],
      status: ['none', 'success', 'info', 'warning', 'error', '403', '404', '500'],
      imageType: ['none', 'box1', 'box2', 'magnifier'],
      addon: ['none', 'before', 'after', 'both'],
      selectiveSize: ['sm', 'md', 'lg'],
      colorFormat: ['hex', 'rgb', 'hsb'],
      filePickerMode: ['basic', 'advanced'],
      datepickerSelectionMode: ['single', 'multiple', 'range'],
      numberMode: ['decimal', 'currency'],
      fixLabelPos: ['fix-side', 'fix-top'],
      acceptColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      acceptAppearance: ['basic', 'text', 'outlined', 'link'],
      buttonSize: ['sm', 'md', 'lg'],
      rejectColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      rejectAppearance: ['basic', 'text', 'outlined', 'link'],
      defaultFocus: ['none', 'accept', 'reject'],
      toastPosition: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'center'],
      dialogPosition: ['top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright', 'center'],
      buttonIconPos: ['left', 'right'],
      buttonColor: ['secondary', 'success', 'info', 'warning', 'danger', 'help', 'primary'],
      buttonAppearance: ['basic', 'text', 'outlined', 'link'],
      severity: ['success', 'error', 'info', 'warn'],
      pinchLimitZoom: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 'original image size'],
      pinchOverflow: ['hidden', 'visible'],
      pinchDisableZoomControl: ['disable', 'never', 'auto'],
      pinchListeners: ['auto', 'mouse and touch'],
    };
    for (const item of this.previewItems) {
      if (Object.keys(dropdownData).includes(item)) {
        const cmpRef = this.createComponent(DropdownComponent, item, 'firstRow');
        cmpRef.instance.options = dropdownData[item].map(v => ({label: v, value: v}));
      } else if (typeof this[item] === 'string' || typeof this[item] === 'number') {
        this.createComponent(InputTextComponent, item, 'firstRow');
      } else if (typeof this[item] === 'boolean') {
        this.createComponent(CheckboxComponent, item, 'secondRow');
      }
    }
  }

  onConfigChange({modifiedConfig, currentConfig}: NgConfigChangeEvent) {
    if (this.disableConfigChangeEffect) {
      return
    }
    const equalization = {
      rtl: 'rtl',
      fixLabelPos: 'fixLabelPos',
      labelPos: 'labelPos',
      filled: 'filled',
      inputSize: 'selectiveSize',
      showRequiredStar: 'showRequiredStar',
      disableConfigChangeEffect: 'disableConfigChangeEffect',
    }
    Object.entries(modifiedConfig).forEach(item => {
      const key = item[0];
      const value = item[1];
      const ref = this.cmpRefs.find(({instance}) => instance.key == equalization[key]);
      if (ref) {
        ref.instance.value = value;
      }
    })
  }

  createComponent(cmp: Type<any>, previewItem: PreviewItem, row: 'firstRow' | 'secondRow') {
    const cmpRef = this[row].createComponent(cmp);
    cmpRef.location.nativeElement.classList.add('col-md-6', 'col-xl-4');
    cmpRef.instance.label = this.translationService.instant(previewItem);
    cmpRef.instance.labelWidth = 130;
    cmpRef.instance.value = this[previewItem];
    cmpRef.instance.labelPos = this.configService.getConfig().labelPos;
    cmpRef.instance.rtl = this.configService.getConfig().rtl;
    cmpRef.instance.filled = this.configService.getConfig().filled;
    cmpRef.instance.inputSize = this.configService.getConfig().inputSize;
    cmpRef.instance.key = previewItem;
    this.translationService.stream(previewItem).pipe(takeUntil(this.destroy$)).subscribe(res => {
      cmpRef.instance.label = res;
    })
    switch (cmp) {
      case DropdownComponent:
        cmpRef.location.nativeElement.classList.add('mb-4');
        if (previewItem == 'addon') {
          cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
            switch (event.value) {
              case 'none':
                this.addonChange.emit(null)
                break;
              case 'before':
                this.addonChange.emit({
                  before: {
                    type: 'icon',
                    icon: 'pi pi-home',
                    onClick: () => alert('icon clicked!')
                  }
                })
                break;
              case 'after':
                this.addonChange.emit({after: {type: 'button', label: 'home', onClick: () => alert('button clicked!')}})
                break;
              case 'both':
                this.addonChange.emit({
                  before: {type: 'icon', icon: 'pi pi-home', onClick: () => alert('icon clicked!')},
                  after: {type: 'button', label: 'home', onClick: () => alert('button clicked!')},
                })
                break;
            }
          });
          cmpRef.instance.value = 'none';
          break;
        }
        cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this[`${previewItem}Change`].emit(event.value == 'none' ? null : event.value);
        });
        break;
      case InputTextComponent:
        cmpRef.location.nativeElement.classList.add('mb-4');
        cmpRef.instance.onInput.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this[`${previewItem}Change`].emit(event.target.value);
        });
        break;
      case CheckboxComponent:
        cmpRef.instance.onChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
          this[`${previewItem}Change`].emit(event.checked);
        });
        break;
    }
    this.cmpRefs.push(cmpRef);
    return cmpRef;
  }
}

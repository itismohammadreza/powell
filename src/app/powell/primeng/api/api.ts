import {ObjectUtils, UniqueComponentId, ZIndexUtils} from "primeng/utils";
import {ConnectedOverlayScrollHandler, DomHandler} from 'primeng/dom';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  AutoCompleteCompleteEvent,
  AutoCompleteDropdownClickEvent,
  AutoCompleteLazyLoadEvent,
  AutoCompleteSelectEvent,
  AutoCompleteUnselectEvent
} from "primeng/autocomplete";
import {BreadcrumbItemClickEvent} from "primeng/breadcrumb";
import {ChevronLeftIcon} from 'primeng/icons/chevronleft';
import {ChevronRightIcon} from 'primeng/icons/chevronright';
import {ChevronUpIcon} from 'primeng/icons/chevronup';
import {ChevronDownIcon} from 'primeng/icons/chevrondown';
import {TimesIcon} from 'primeng/icons/times';
import {CalendarIcon} from 'primeng/icons/calendar';

import {
  CalendarMonthChangeEvent,
  CalendarResponsiveOptions,
  CalendarTypeView,
  CalendarYearChangeEvent,
  LocaleSettings,
  Month,
  NavigationState,
} from "primeng/calendar";

import {
  CascadeSelectBeforeHideEvent,
  CascadeSelectBeforeShowEvent,
  CascadeSelectHideEvent,
  CascadeSelectShowEvent
} from "primeng/cascadeselect";
import {CheckboxChangeEvent} from "primeng/checkbox";
import {ChipsAddEvent, ChipsClickEvent, ChipsRemoveEvent} from "primeng/chips";
import {ColorPickerChangeEvent} from "primeng/colorpicker";
import {DropdownChangeEvent, DropdownFilterEvent, DropdownLazyLoadEvent} from "primeng/dropdown";
import {
  FileBeforeUploadEvent,
  FileProgressEvent,
  FileRemoveEvent,
  FileSelectEvent,
  FileSendEvent,
  FileUploadErrorEvent,
  FileUploadEvent,
  FileUploadHandlerEvent,
  UploadEvent
} from "primeng/fileupload";
import {InputNumberInputEvent} from "primeng/inputnumber";
import {
  ListboxChangeEvent,
  ListboxClickEvent,
  ListboxDoubleClickEvent,
  ListboxFilterEvent,
  ListboxSelectAllChangeEvent
} from "primeng/listbox";
import {
  MultiSelectBlurEvent,
  MultiSelectChangeEvent,
  MultiSelectFilterEvent,
  MultiSelectFocusEvent,
  MultiSelectLazyLoadEvent,
  MultiSelectRemoveEvent,
  MultiSelectSelectAllChangeEvent,
} from "primeng/multiselect";
import {RadioButtonClickEvent} from "primeng/radiobutton";
import {RatingRateEvent} from "primeng/rating";
import {SelectButtonChangeEvent, SelectButtonOptionClickEvent} from "primeng/selectbutton";
import {SliderChangeEvent, SliderSlideEndEvent} from "primeng/slider";
import {InputSwitchChangeEvent} from "primeng/inputswitch";
import {
  TableColResizeEvent,
  TableColumnReorderEvent,
  TableContextMenuSelectEvent,
  TableContextMenuSelectionChangeEvent,
  TableFilterEvent,
  TableHeaderCheckboxToggleEvent,
  TableLazyLoadEvent,
  TablePageEvent,
  TableRowCollapseEvent,
  TableRowExpandEvent,
  TableRowReorderEvent,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
  TableSelectAllChangeEvent,
} from "primeng/table";
import {ToggleButtonChangeEvent} from "primeng/togglebutton";
import {
  TreeFilterEvent,
  TreeLazyLoadEvent,
  TreeNodeCollapseEvent,
  TreeNodeContextMenuSelectEvent,
  TreeNodeDropEvent,
  TreeNodeExpandEvent,
  TreeNodeSelectEvent,
  TreeNodeUnSelectEvent,
  TreeScrollEvent,
  TreeScrollIndexChangeEvent
} from "primeng/tree";
import {TreeSelectNodeCollapseEvent, TreeSelectNodeExpandEvent} from "primeng/treeselect";
import {TriStateCheckboxChangeEvent} from "primeng/tristatecheckbox";
import {
  Confirmation,
  ConfirmationService,
  ConfirmEventType,
  FilterMetadata,
  FilterService,
  MenuItem,
  Message,
  MessageService,
  OverlayOnHideEvent,
  OverlayOnShowEvent,
  OverlayOptions,
  OverlayService,
  PrimeNGConfig,
  PrimeTemplate,
  ScrollerOptions,
  SharedModule,
  SortMeta,
  TableState,
  Translation,
  TranslationKeys,
  TreeNode
} from 'primeng/api';
import {NgTableSortMode} from "@powell/models";
import {RefreshIcon} from "primeng/icons/refresh";
import {EyeIcon} from "primeng/icons/eye";
import {UndoIcon} from "primeng/icons/undo";
import {SearchMinusIcon} from "primeng/icons/searchminus";
import {SearchPlusIcon} from "primeng/icons/searchplus";

interface PrimeMultiSortEvent {
  data: any[];
  mode: NgTableSortMode;
  multiSortMeta: PrimeSortMeta[];
}

interface PrimeSingleSortEvent {
  data: any[];
  mode: NgTableSortMode;
  field: string;
  order: number;
}

export interface PrimeTreeSelectFilterEvent {
  originalEvent: Event;
  filteredValue: any;
}

export interface PrimeCheckboxGroupChangeEvent {
  originalEvent: Event;
  value: any[];
}

export type PrimeAutoCompleteLazyLoadEvent = AutoCompleteLazyLoadEvent;
export type PrimeAutoCompleteCompleteEvent = AutoCompleteCompleteEvent;
export type PrimeAutoCompleteSelectEvent = AutoCompleteSelectEvent;
export type PrimeAutoCompleteUnSelectEvent = AutoCompleteUnselectEvent;
export type PrimeAutoCompleteDropdownClickEvent = AutoCompleteDropdownClickEvent;

export type PrimeBreadcrumbItemClickEvent = BreadcrumbItemClickEvent;

export type PrimeCalendarMonthChangeEvent = CalendarMonthChangeEvent;
export type PrimeCalendarYearChangeEvent = CalendarYearChangeEvent;
export type PrimeNavigationState = NavigationState;
export type PrimeCalendarResponsiveOptions = CalendarResponsiveOptions;
export type PrimeCalendarTypeView = CalendarTypeView;
export type PrimeLocaleSettings = LocaleSettings;
export type PrimeMonth = Month;

export type PrimeCascadeSelectBeforeHideEvent = CascadeSelectBeforeHideEvent;
export type PrimeCascadeSelectBeforeShowEvent = CascadeSelectBeforeShowEvent;
export type PrimeCascadeSelectHideEvent = CascadeSelectHideEvent;
export type PrimeCascadeSelectShowEvent = CascadeSelectShowEvent;

export type PrimeCheckboxChangeEvent = CheckboxChangeEvent;

export type PrimeChipsAddEvent = ChipsAddEvent;
export type PrimeChipsClickEvent = ChipsClickEvent;
export type PrimeChipsRemoveEvent = ChipsRemoveEvent;

export type PrimeColorPickerChangeEvent = ColorPickerChangeEvent;

export type PrimeDropdownChangeEvent = DropdownChangeEvent;
export type PrimeDropdownFilterEvent = DropdownFilterEvent;
export type PrimeDropdownLazyLoadEvent = DropdownLazyLoadEvent;

export type PrimeFileBeforeUploadEvent = FileBeforeUploadEvent;
export type PrimeFileProgressEvent = FileProgressEvent;
export type PrimeFileRemoveEvent = FileRemoveEvent;
export type PrimeFileUploadErrorEvent = FileUploadErrorEvent;
export type PrimeFileSelectEvent = FileSelectEvent;
export type PrimeFileSendEvent = FileSendEvent;
export type PrimeFileUploadEvent = FileUploadEvent;
export type PrimeFileUploadHandlerEvent = FileUploadHandlerEvent;
export type PrimeUploadEvent = UploadEvent;

export type PrimeInputNumberInputEvent = InputNumberInputEvent;

export type PrimeListboxChangeEvent = ListboxChangeEvent;
export type PrimeListboxClickEvent = ListboxClickEvent;
export type PrimeListboxDoubleClickEvent = ListboxDoubleClickEvent;
export type PrimeListboxFilterEvent = ListboxFilterEvent;
export type PrimeListboxSelectAllChangeEvent = ListboxSelectAllChangeEvent;

export type PrimeMultiSelectBlurEvent = MultiSelectBlurEvent;
export type PrimeMultiSelectChangeEvent = MultiSelectChangeEvent;
export type PrimeMultiSelectFilterEvent = MultiSelectFilterEvent;
export type PrimeMultiSelectFocusEvent = MultiSelectFocusEvent;
export type PrimeMultiSelectLazyLoadEvent = MultiSelectLazyLoadEvent;
export type PrimeMultiSelectRemoveEvent = MultiSelectRemoveEvent;
export type PrimeMultiSelectAllChangeEvent = MultiSelectSelectAllChangeEvent;

export type PrimeRadioButtonClickEvent = RadioButtonClickEvent;

export type PrimeRatingRateEvent = RatingRateEvent;

export type PrimeSelectButtonOptionClickEvent = SelectButtonOptionClickEvent;
export type PrimeSelectButtonChangeEvent = SelectButtonChangeEvent;

export type PrimeSliderChangeEvent = SliderChangeEvent;
export type PrimeSliderSlideEndEvent = SliderSlideEndEvent;

export type PrimeInputSwitchChangeEvent = InputSwitchChangeEvent;

export type PrimeTableColResizeEvent = TableColResizeEvent;
export type PrimeTableColumnReorderEvent = TableColumnReorderEvent;
export type PrimeTableContextMenuSelectEvent = TableContextMenuSelectEvent;
export type PrimeTableContextMenuSelectionChangeEvent = TableContextMenuSelectionChangeEvent;
export type PrimeTableFilterEvent = TableFilterEvent;
export type PrimeTableHeaderCheckboxToggleEvent = TableHeaderCheckboxToggleEvent;
export type PrimeTableLazyLoadEvent = TableLazyLoadEvent;
export type PrimeTablePageEvent = TablePageEvent;
export type PrimeTableSortEvent = { multisortmeta: PrimeSortMeta[] } | any;
export type PrimeTableSelectAllChangeEvent = TableSelectAllChangeEvent;
export type PrimeTableRowCollapseEvent = TableRowCollapseEvent;
export type PrimeTableRowExpandEvent = TableRowExpandEvent;
export type PrimeTableRowReorderEvent = TableRowReorderEvent;
export type PrimeTableRowSelectEvent = TableRowSelectEvent;
export type PrimeTableRowUnSelectEvent = TableRowUnSelectEvent;
export type PrimeTableState = TableState;
export type PrimeSortFunctionEvent = PrimeMultiSortEvent | PrimeSingleSortEvent;

export type PrimeToggleButtonChangeEvent = ToggleButtonChangeEvent;

export type PrimeTreeFilterEvent = TreeFilterEvent;
export type PrimeTreeLazyLoadEvent = TreeLazyLoadEvent;
export type PrimeTreeScrollEvent = TreeScrollEvent;
export type PrimeTreeNodeCollapseEvent = TreeNodeCollapseEvent;
export type PrimeTreeNodeDropEvent = TreeNodeDropEvent;
export type PrimeTreeNodeContextMenuSelectEvent = TreeNodeContextMenuSelectEvent;
export type PrimeTreeNodeExpandEvent = TreeNodeExpandEvent;
export type PrimeTreeNodeSelectEvent = TreeNodeSelectEvent;
export type PrimeTreeScrollIndexChangeEvent = TreeScrollIndexChangeEvent;
export type PrimeTreeNodeUnSelectEvent = TreeNodeUnSelectEvent;
export type PrimeTreeSelectionChangeEvent = PrimeTreeNode<any> | PrimeTreeNode<any>[];

export type PrimeTreeSelectNodeCollapseEvent = TreeSelectNodeCollapseEvent;
export type PrimeTreeSelectNodeExpandEvent = TreeSelectNodeExpandEvent;
export type PrimeTriStateCheckboxChangeEvent = TriStateCheckboxChangeEvent;

export type PrimeOverlayOnShowEvent = OverlayOnShowEvent;
export type PrimeOverlayOnHideEvent = OverlayOnHideEvent;

export const PrimeConfig = PrimeNGConfig;
export type PrimeConfig = PrimeNGConfig;

export const PrimeConfirmationService = ConfirmationService;
export type PrimeConfirmationService = ConfirmationService;

export const PrimeFilterService = FilterService;
export type PrimeFilterService = FilterService;

export const PrimeMessageService = MessageService;
export type PrimeMessageService = MessageService;

export const PrimeDialogService = DialogService;
export type PrimeDialogService = DialogService;

export const PrimeDynamicDialogRef = DynamicDialogRef;
export type PrimeDynamicDialogRef = DynamicDialogRef;

export const PrimeConfirmEventType = ConfirmEventType;
export type PrimeConfirmEventType = ConfirmEventType;

export const PrimeOverlayService = OverlayService;
export type PrimeOverlayService = OverlayService;

export const PrimeTemplateDirective = PrimeTemplate;
export type PrimeTemplateDirective = PrimeTemplate;


export const PrimeZIndexUtils = ZIndexUtils;
export const PrimeDomHandler = DomHandler;
export const PrimeUniqueComponentId = UniqueComponentId;
export const PrimeConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
export const PrimeTranslationKeys = TranslationKeys;
export const PrimeObjectUtils = ObjectUtils;
export const PrimeSearchPlusIcon = SearchPlusIcon;

export type PrimeConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
export type PrimeScrollerOptions = ScrollerOptions;
export type PrimeOverlayOptions = OverlayOptions;
export type PrimeFilterMetadata = FilterMetadata;
export type PrimeSortMeta = SortMeta;
export type PrimeMenuItem = MenuItem;
export type PrimeConfirmation = Confirmation;
export type PrimeMessage = Message;
export type PrimeTranslation = Translation;
export type PrimeTreeNode<T> = TreeNode<T>;

export const PrimeChevronLeftIcon = ChevronLeftIcon;
export const PrimeChevronRightIcon = ChevronRightIcon;
export const PrimeChevronUpIcon = ChevronUpIcon;
export const PrimeChevronDownIcon = ChevronDownIcon;
export const PrimeTimesIcon = TimesIcon;
export const PrimeCalendarIcon = CalendarIcon;
export const PrimeRefreshIcon = RefreshIcon;
export const PrimeEyeIcon = EyeIcon;
export const PrimeUndoIcon = UndoIcon;
export const PrimeSearchMinusIcon = SearchMinusIcon;
export const PrimeSharedModule = SharedModule;

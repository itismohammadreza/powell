import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  AsyncEvent,
  CssObject,
  EmptyIcon,
  Size,
  TableAction,
  TableActionsConfig,
  TableColDef,
  TableColumnResizeMode,
  TableCompareSelectionBy,
  TableContextMenuSelectionMode,
  TableFilterDisplay,
  TableFilters,
  TablePaginationPosition,
  TableResponsiveLayout,
  TableRowExpandMode,
  TableRowGroupMode,
  TableSelectionMode,
  TableSortMode,
  TableStateStorage
} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {
  $ScrollerOptions,
  $SortMeta,
  $Table,
  $TableColResizeEvent,
  $TableColumnReorderEvent,
  $TableContextMenuSelectEvent,
  $TableContextMenuSelectionChangeEvent,
  $TableFilterEvent,
  $TableHeaderCheckboxToggleEvent,
  $TableLazyLoadEvent,
  $TablePageEvent,
  $TableRowCollapseEvent,
  $TableRowExpandEvent,
  $TableRowReorderEvent,
  $TableRowSelectEvent,
  $TableRowUnSelectEvent,
  $TableSelectAllChangeEvent,
  $TableSortEvent,
  $TableState,
} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-table',
  templateUrl: './table.component.html',
  standalone: false
})
export class TableComponent implements OnInit, AfterContentInit {
  private configService = inject(ConfigService);

  @Input({required: true}) items: any[];
  @Input() filterDisplay: TableFilterDisplay = 'menu';
  @Input({required: true}) colDef: TableColDef[];
  @Input() reorderableRows: boolean;
  @Input() selectableRows: boolean;
  @Input() actionsConfig: TableActionsConfig;
  @Input() rtl: boolean;
  @Input() emptyMessage: string;
  @Input() emptyIcon: string;
  @Input() emptyImageSrc: string;
  @Input() emptyImageType: EmptyIcon = 'box1';
  @Input() header: string;
  @Input() globalFilter: boolean;
  @Input() globalFilterPlaceholder: string;
  @Input() followConfig: boolean;
  @Input() showSelectionIndicator: boolean;
  // native properties
  @Input() frozenColumns: any[];
  @Input() frozenValue: any[];
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() tableStyle: CssObject;
  @Input() tableStyleClass: string;
  @Input() paginator: boolean = false;
  @Input() pageLinks: number = 5;
  @Input() rowsPerPageOptions: any[];
  @Input() alwaysShowPaginator: boolean = true;
  @Input() paginatorPosition: TablePaginationPosition = 'bottom';
  @Input() paginatorStyleClass: string;
  @Input() paginatorDropdownAppendTo: any;
  @Input() paginatorDropdownScrollHeight: string = '200px';
  @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';
  @Input() showCurrentPageReport: boolean = false;
  @Input() showJumpToPageDropdown: boolean = false;
  @Input() showJumpToPageInput: boolean = false;
  @Input() showFirstLastIcon: boolean = true;
  @Input() showPageLinks: boolean = true;
  @Input() defaultSortOrder: number = 1;
  @Input() sortMode: TableSortMode = 'single';
  @Input() resetPageOnSort: boolean = true;
  @Input() selectionMode: TableSelectionMode;
  @Input() selectionPageOnly: boolean = false;
  @Input() contextMenuSelection: any;
  @Input() contextMenuSelectionMode: TableContextMenuSelectionMode = 'separate';
  @Input() dataKey: string;
  @Input() metaKeySelection: boolean = false;
  @Input() rowSelectable: any;
  @Input() rowTrackBy: Function;
  @Input() lazy: boolean = false;
  @Input() lazyLoadOnInit: boolean = true;
  @Input() compareSelectionBy: TableCompareSelectionBy = 'deepEquals';
  @Input() csvSeparator: string = ',';
  @Input() exportFilename: string = 'download';
  @Input() filters: TableFilters = {};
  @Input() globalFilterFields: string[];
  @Input() filterDelay: number = 300;
  @Input() filterLocale: string;
  @Input() expandedRowKeys: Record<string, boolean> = {};
  @Input() rowExpandMode: TableRowExpandMode = 'multiple';
  @Input() scrollable: boolean = false;
  @Input() rowGroupMode: TableRowGroupMode;
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: $ScrollerOptions;
  @Input() virtualScrollDelay: number = 250;
  @Input() frozenWidth: string;
  @Input() contextMenu: any;
  @Input() resizableColumns: boolean = false;
  @Input() columnResizeMode: TableColumnResizeMode = 'fit';
  @Input() reorderableColumns: boolean = false;
  @Input() loadingIcon: string;
  @Input() showLoader: boolean = true;
  @Input() rowHover: boolean = false;
  @Input() customSort: boolean = false;
  @Input() showInitialSortBadge: boolean = true;
  @Input() autoLayout: boolean = false;
  @Input() exportFunction: Function;
  @Input() exportHeader: string;
  @Input() stateKey: string;
  @Input() stateStorage: TableStateStorage = 'session';
  @Input() groupRowsBy: any;
  @Input() size: Size;
  @Input() showGridlines: boolean = true;
  @Input() stripedRows: boolean;
  @Input() groupRowsByOrder: number = 1;
  @Input() responsiveLayout: TableResponsiveLayout = 'scroll';
  @Input() breakpoint: string = '640px';
  @Input() paginatorLocale: string;
  @Input() first: number = 0;
  @Input() rows: number;
  @Input() totalRecords: number;
  @Input() sortField: string;
  @Input() sortOrder: number;
  @Input() multiSortMeta: $SortMeta[];
  @Input() selection: any;
  @Input() selectAll: boolean = null;
  @Output() contextMenuSelectionChange = new EventEmitter<$TableContextMenuSelectionChangeEvent>();
  @Output() selectAllChange = new EventEmitter<$TableSelectAllChangeEvent>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() onRowSelect = new EventEmitter<$TableRowSelectEvent>();
  @Output() onRowUnselect = new EventEmitter<$TableRowUnSelectEvent<any>>();
  @Output() onPage = new EventEmitter<$TablePageEvent>();
  @Output() onSort = new EventEmitter<{multisortmeta: $SortMeta[]} | any>();
  @Output() onFilter = new EventEmitter<$TableFilterEvent>();
  @Output() onLazyLoad = new EventEmitter<AsyncEvent<$TableLazyLoadEvent>>();
  @Output() onRowExpand = new EventEmitter<$TableRowExpandEvent>();
  @Output() onRowCollapse = new EventEmitter<$TableRowCollapseEvent>();
  @Output() onContextMenuSelect = new EventEmitter<$TableContextMenuSelectEvent>();
  @Output() onColResize = new EventEmitter<$TableColResizeEvent>();
  @Output() onColReorder = new EventEmitter<$TableColumnReorderEvent>();
  @Output() onRowReorder = new EventEmitter<$TableRowReorderEvent>();
  @Output() onHeaderCheckboxToggle = new EventEmitter<$TableHeaderCheckboxToggleEvent>();
  @Output() sortFunction = new EventEmitter<any>();
  @Output() firstChange = new EventEmitter<number>();
  @Output() rowsChange = new EventEmitter<number>();
  @Output() onStateSave = new EventEmitter<$TableState>();
  @Output() onStateRestore = new EventEmitter<$TableState>();
  @Output() onTableReady = new EventEmitter<$Table>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;
  @ViewChild('dataTable', {static: true}) dataTable: $Table;

  cellTemplates: Record<string, TemplateRef<any>> = {}

  loading: boolean;
  templateMap: Record<string, TemplateRef<any>> = {};
  activeSortField: string;

  ngOnInit() {
    this.onTableReady.emit(this.dataTable);
    this.actionsConfig.actions = this.actionsConfig?.actions.filter(action => action.visible ?? true) || [];
    this.colDef = this.colDef.filter(col => col.visible ?? true);
    this.colDef.forEach(conf => {
      if (conf.filter?.type == 'slider') {
        Object.assign(conf.filter, {sliderValue: conf.filter.range ? [conf.filter.min || 0, conf.filter.max || 100] : conf.filter.max})
      }
    });
    this.configService.configureComponent(this, true);
  }

  _onSort(event: $TableSortEvent) {
    if (this.sortMode == 'multiple') {
      if (event.multisortmeta?.length > 1) {
        this.activeSortField = null;
      } else {
        this.activeSortField = event.multisortmeta?.map(sortMeta => sortMeta.field)[0];
      }
    } else {
      this.activeSortField = event.field;
    }
    this.onSort.emit(event);
  }

  onResetSort(event: Event) {
    event.stopPropagation();
    this.activeSortField = null;
    this.dataTable.reset();
    this.dataTable._sortOrder = 1;
    this.dataTable._sortField = this.sortField || 'id';
    this.dataTable.sortSingle();
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
      const templates = [
        'caption',
        'headergrouped',
        'header',
        'body',
        'loadingbody',
        'footer',
        'footergrouped',
        'colgroup',
        'summary',
        'rowexpansion',
        'groupheader',
        'groupfooter',
        'frozenheader',
        'frozenbody',
        'frozenfooter',
        'frozencolgroup',
        'frozenrowexpansion',
        'emptymessage',
        'paginatorleft',
        'paginatorright',
        'paginatordropdownicon',
        'paginatordropdownitem',
        'paginatorfirstpagelinkicon',
        'paginatorlastpagelinkicon',
        'paginatorpreviouspagelinkicon',
        'paginatornextpagelinkicon',
        'loadingicon',
        'reorderindicatorupicon',
        'reorderindicatordownicon',
        'sorticon',
        'checkboxicon',
        'headercheckboxicon',
      ]
      if (templates.includes(name)) {
        this.templateMap[name] = item.templateRef;
      } else {
        this.cellTemplates[name] = item.templateRef
      }
    });
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onLazyLoad(event: $TableLazyLoadEvent) {
    this.loading = true;
    this.onLazyLoad.emit({event, loadingCallback: this.removeLoading})
  }

  onFirstChange(event: number) {
    this.first = event;
    this.firstChange.emit(this.first);
  }

  onRowsChange(event: number) {
    this.rows = event;
    this.rowsChange.emit(this.rows);
  }

  onSelectAllChange(event: $TableSelectAllChangeEvent) {
    this.selectAll = event.checked;
    this.selectAllChange.emit(event);
  }

  onSelectionChange(event: any[]) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
  }

  onContextMenuSelectionChange(event: $TableContextMenuSelectionChangeEvent) {
    this.contextMenuSelection = event;
    this.contextMenuSelectionChange.emit(this.contextMenuSelection);
  }

  resolveFieldData(obj: any, field: string | string[], value?: any) {
    if (typeof field == 'string') {
      return this.resolveFieldData(obj, field.split('.'), value);
    } else if (field.length == 1 && value !== undefined) {
      return obj[field[0]] = value;
    } else if (field.length == 0) {
      return obj;
    } else {
      return this.resolveFieldData(obj[field[0]], field.slice(1), value);
    }
  }

  onChangeFilterValue(event: any, filterCallback: Function, col: TableColDef) {
    let filterValue;
    switch (col.filter.type) {
      case 'text':
        const inputElement = event.target as HTMLInputElement;
        filterValue = inputElement.value;
        break;
      case 'multi-select':
      case 'select':
        filterValue = event.value;
        break;
      case 'boolean':
        filterValue = event.checked;
        break;
      case 'slider':
        filterValue = event.values;
        break;
      case 'datepicker':
        filterValue = new Date(event);
        break;
    }
    if (!this.lazy) {
      filterCallback(filterValue.toString());
    } else {
      this.onFilter.emit({filteredValue: filterValue, col} as any)
    }
  }

  handleCellStyleClass(cellStyleClass: Function | string, item: any) {
    if (typeof cellStyleClass == 'function')
      return cellStyleClass(item);
    else {
      return cellStyleClass
    }
  }

  handleCellStyle(cellStyle: Function | CssObject, item: any) {
    if (typeof cellStyle == 'function')
      return cellStyle(item);
    else {
      return cellStyle
    }
  }

  handleCellRenderer(col: TableColDef, item: any) {
    if (col.render && typeof col.render == 'function')
      return col.render(item);
    else {
      return this.resolveFieldData(item, col.field)
    }
  }

  handleActionVisibility(action: TableAction, item: any) {
    if (typeof action.visible == 'function')
      return action.visible(item);
    else {
      return action.visible ?? true;
    }
  }

  onGlobalFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dataTable.filterGlobal(inputElement.value, 'contains')
  }

  removeLoading = (ok: boolean = true) => {
    this.loading = false
    if (!ok) {
      this.activeSortField = null
    }
  }
}

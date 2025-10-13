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

  @Input() items: SafeAny[] = [];
  @Input() filterDisplay: TableFilterDisplay = 'menu';
  @Input() colDef: TableColDef[] = [];
  @Input() reorderableRows: boolean = false;
  @Input() selectableRows: boolean = false;
  @Input() actionsConfig: Optional<TableActionsConfig>;
  @Input() rtl: boolean = false;
  @Input() emptyMessage: Optional<string>;
  @Input() emptyIcon: Optional<string>;
  @Input() emptyImageSrc: Optional<string>;
  @Input() emptyImageType: EmptyIcon = 'box1';
  @Input() header: Optional<string>;
  @Input() globalFilter: boolean = false;
  @Input() globalFilterPlaceholder: Optional<string>;
  @Input() followConfig: boolean = false;
  @Input() showSelectionIndicator: boolean = false;
  @Input() frozenActions: boolean = true;
  // native properties
  @Input() frozenColumns: Optional<SafeAny[]>;
  @Input() frozenValue: Optional<SafeAny[]>;
  @Input() tableStyle: Optional<CssObject>;
  @Input() tableStyleClass: Optional<string>;
  @Input() paginator: boolean = false;
  @Input() pageLinks: number = 5;
  @Input() rowsPerPageOptions: Optional<SafeAny[]>;
  @Input() alwaysShowPaginator: boolean = true;
  @Input() paginatorPosition: TablePaginationPosition = 'bottom';
  @Input() paginatorStyleClass: Optional<string>;
  @Input() paginatorDropdownAppendTo: Optional<SafeAny>;
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
  @Input() selectionMode: Optional<TableSelectionMode>;
  @Input() selectionPageOnly: boolean = false;
  @Input() contextMenuSelection: Optional<SafeAny>;
  @Input() contextMenuSelectionMode: TableContextMenuSelectionMode = 'separate';
  @Input() dataKey: Optional<string>;
  @Input() metaKeySelection: boolean = false;
  @Input() rowSelectable: Optional<SafeAny>;
  @Input() rowTrackBy: Optional<Fn>;
  @Input() lazy: boolean = false;
  @Input() lazyLoadOnInit: boolean = true;
  @Input() compareSelectionBy: TableCompareSelectionBy = 'deepEquals';
  @Input() csvSeparator: string = ',';
  @Input() exportFilename: string = 'download';
  @Input() filters: TableFilters = {};
  @Input() globalFilterFields: Optional<string[]>;
  @Input() filterDelay: number = 300;
  @Input() filterLocale: Optional<string>;
  @Input() expandedRowKeys: Record<string, boolean> = {};
  @Input() rowExpandMode: TableRowExpandMode = 'multiple';
  @Input() scrollable: boolean = false;
  @Input() rowGroupMode: Optional<TableRowGroupMode>;
  @Input() scrollHeight: Optional<string>;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: Optional<number>;
  @Input() virtualScrollOptions: Optional<$ScrollerOptions>;
  @Input() virtualScrollDelay: number = 250;
  @Input() frozenWidth: Optional<string>;
  @Input() contextMenu: Optional<SafeAny>;
  @Input() resizableColumns: boolean = false;
  @Input() columnResizeMode: TableColumnResizeMode = 'fit';
  @Input() reorderableColumns: boolean = false;
  @Input() loadingIcon: Optional<string>;
  @Input() showLoader: boolean = true;
  @Input() rowHover: boolean = false;
  @Input() customSort: boolean = false;
  @Input() showInitialSortBadge: boolean = true;
  @Input() autoLayout: boolean = false;
  @Input() exportFunction: Optional<Fn>;
  @Input() exportHeader: Optional<string>;
  @Input() stateKey: Optional<string>;
  @Input() stateStorage: TableStateStorage = 'session';
  @Input() groupRowsBy: Optional<SafeAny>;
  @Input() size: Optional<Size>;
  @Input() showGridlines: boolean = true;
  @Input() stripedRows: boolean = false;
  @Input() groupRowsByOrder: number = 1;
  @Input() breakpoint: string = '640px';
  @Input() paginatorLocale: Optional<string>;
  @Input() first: number = 0;
  @Input() rows: Optional<number>;
  @Input() totalRecords: Optional<number>;
  @Input() sortField: Optional<string>;
  @Input() sortOrder: Optional<number>;
  @Input() multiSortMeta: Optional<$SortMeta[]>;
  @Input() selection: Optional<SafeAny>;
  @Input() selectAll: Nullable<boolean> = null;
  @Output() contextMenuSelectionChange = new EventEmitter<$TableContextMenuSelectionChangeEvent>();
  @Output() selectAllChange = new EventEmitter<$TableSelectAllChangeEvent>();
  @Output() selectionChange = new EventEmitter<SafeAny>();
  @Output() onRowSelect = new EventEmitter<$TableRowSelectEvent>();
  @Output() onRowUnselect = new EventEmitter<$TableRowUnSelectEvent<SafeAny>>();
  @Output() onPage = new EventEmitter<$TablePageEvent>();
  @Output() onSort = new EventEmitter<{multisortmeta: $SortMeta[]} | SafeAny>();
  @Output() onFilter = new EventEmitter<$TableFilterEvent>();
  @Output() onLazyLoad = new EventEmitter<AsyncEvent<$TableLazyLoadEvent>>();
  @Output() onRowExpand = new EventEmitter<$TableRowExpandEvent>();
  @Output() onRowCollapse = new EventEmitter<$TableRowCollapseEvent>();
  @Output() onContextMenuSelect = new EventEmitter<$TableContextMenuSelectEvent>();
  @Output() onColResize = new EventEmitter<$TableColResizeEvent>();
  @Output() onColReorder = new EventEmitter<$TableColumnReorderEvent>();
  @Output() onRowReorder = new EventEmitter<$TableRowReorderEvent>();
  @Output() onHeaderCheckboxToggle = new EventEmitter<$TableHeaderCheckboxToggleEvent>();
  @Output() sortFunction = new EventEmitter<SafeAny>();
  @Output() firstChange = new EventEmitter<number>();
  @Output() rowsChange = new EventEmitter<number>();
  @Output() onStateSave = new EventEmitter<$TableState>();
  @Output() onStateRestore = new EventEmitter<$TableState>();
  @Output() onTableReady = new EventEmitter<$Table>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;
  @ViewChild('dataTable', {static: true}) dataTable!: $Table;

  cellTemplates: Record<string, TemplateRef<SafeAny>> = {}

  loading: boolean = false;
  templateMap: Record<string, TemplateRef<SafeAny>> = {};
  activeSortField: Optional<string>;

  ngOnInit() {
    if (this.frozenActions) {
      this.scrollable = true;
    }
    this.onTableReady.emit(this.dataTable);
    if (this.actionsConfig) {
      this.actionsConfig.actions = this.actionsConfig.actions.filter(action => action.visible ?? true) || [];
    }
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
        this.activeSortField = undefined;
      } else {
        this.activeSortField = event.multisortmeta?.map((sortMeta: SafeAny) => sortMeta.field)[0];
      }
    } else {
      this.activeSortField = event.field;
    }
    this.onSort.emit(event);
  }

  onResetSort(event: Event) {
    event.stopPropagation();
    this.activeSortField = undefined;
    this.dataTable.reset();
    this.dataTable._sortOrder = 1;
    this.dataTable._sortField = this.sortField || 'id';
    this.dataTable.sortSingle();
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
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

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
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

  onSelectionChange(event: SafeAny[]) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
  }

  onContextMenuSelectionChange(event: $TableContextMenuSelectionChangeEvent) {
    this.contextMenuSelection = event;
    this.contextMenuSelectionChange.emit(this.contextMenuSelection);
  }

  resolveFieldData(obj: SafeAny, field: string | string[], value?: SafeAny): SafeAny {
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

  onChangeFilterValue(event: SafeAny, filterCallback: Fn, col: TableColDef) {
    let filterValue;
    switch (col.filter?.type) {
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
      this.onFilter.emit({filteredValue: filterValue, col} as SafeAny)
    }
  }

  handleCellStyleClass(cellStyleClass: Fn | string, item: SafeAny) {
    if (!cellStyleClass) {
      return '';
    }
    if (typeof cellStyleClass == 'function')
      return cellStyleClass(item);
    else {
      return cellStyleClass
    }
  }

  handleCellStyle(cellStyle: Fn | CssObject, item: SafeAny) {
    if (typeof cellStyle == 'function')
      return cellStyle(item);
    else {
      return cellStyle
    }
  }

  handleCellRenderer(col: TableColDef, item: SafeAny) {
    if (col.render && typeof col.render == 'function')
      return col.render(item);
    else {
      return this.resolveFieldData(item, col.field as string);
    }
  }

  handleActionVisibility(action: TableAction, item: SafeAny) {
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
      this.activeSortField = undefined;
    }
  }
}

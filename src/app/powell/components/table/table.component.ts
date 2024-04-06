import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  NgAsyncEvent,
  NgCssObject,
  NgEmptyIcon,
  NgSize,
  NgTableAction,
  NgTableActionsConfig,
  NgTableColDef,
  NgTableColumnResizeMode,
  NgTableCompareSelectionBy,
  NgTableContextMenuSelectionMode,
  NgTableFilterDisplay,
  NgTableFilters,
  NgTablePaginationPosition,
  NgTableResponsiveLayout,
  NgTableRowExpandMode,
  NgTableRowGroupMode,
  NgTableScrollDirection,
  NgTableSelectionMode,
  NgTableSortMode,
  NgTableStateStorage
} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {
  PrimeScrollerOptions,
  PrimeSortMeta,
  PrimeTableColResizeEvent,
  PrimeTableColumnReorderEvent,
  PrimeTableContextMenuSelectEvent,
  PrimeTableContextMenuSelectionChangeEvent,
  PrimeTableFilterEvent,
  PrimeTableHeaderCheckboxToggleEvent,
  PrimeTableLazyLoadEvent,
  PrimeTablePageEvent,
  PrimeTableRowCollapseEvent,
  PrimeTableRowExpandEvent,
  PrimeTableRowReorderEvent,
  PrimeTableRowSelectEvent,
  PrimeTableRowUnSelectEvent,
  PrimeTableSelectAllChangeEvent,
  PrimeTableSortEvent,
  PrimeTableState
} from "@powell/primeng/api";
import {PrimeTable} from "@powell/primeng";

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input({required: true}) items: any[];
  @Input() filterDisplay: NgTableFilterDisplay = 'menu';
  @Input({required: true}) colDef: NgTableColDef[];
  @Input() reorderableRows: boolean;
  @Input() selectableRows: boolean;
  @Input() actionsConfig: NgTableActionsConfig;
  @Input() rtl: boolean;
  @Input() emptyMessage: string;
  @Input() emptyIcon: string;
  @Input() emptyImageSrc: string;
  @Input() emptyImageType: NgEmptyIcon = 'box1';
  @Input() header: string;
  @Input() globalFilter: boolean;
  @Input() globalFilterPlaceholder: string;
  @Input() size: NgSize = 'sm';
  @Input() gridlines: boolean = true;
  @Input() striped: boolean;
  @Input() disableConfigChangeEffect: boolean;
  // native properties
  @Input() frozenColumns: any[];
  @Input() frozenValue: any[];
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() tableStyle: NgCssObject;
  @Input() tableStyleClass: string;
  @Input() paginator: boolean = false;
  @Input() pageLinks: number = 5;
  @Input() rowsPerPageOptions: any[];
  @Input() alwaysShowPaginator: boolean = true;
  @Input() paginatorPosition: NgTablePaginationPosition = 'bottom';
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
  @Input() sortMode: NgTableSortMode = 'single';
  @Input() resetPageOnSort: boolean = true;
  @Input() selectionMode: NgTableSelectionMode;
  @Input() selectionPageOnly: boolean = false;
  @Input() contextMenuSelection: any;
  @Input() contextMenuSelectionMode: NgTableContextMenuSelectionMode = 'separate';
  @Input() dataKey: string;
  @Input() metaKeySelection: boolean = false;
  @Input() rowSelectable: any;
  @Input() rowTrackBy: Function;
  @Input() lazy: boolean = false;
  @Input() lazyLoadOnInit: boolean = true;
  @Input() compareSelectionBy: NgTableCompareSelectionBy = 'deepEquals';
  @Input() csvSeparator: string = ',';
  @Input() exportFilename: string = 'download';
  @Input() filters: NgTableFilters = {};
  @Input() globalFilterFields: string[];
  @Input() filterDelay: number = 300;
  @Input() filterLocale: string;
  @Input() expandedRowKeys: Record<string, boolean> = {};
  @Input() rowExpandMode: NgTableRowExpandMode = 'multiple';
  @Input() scrollable: boolean = false;
  @Input() scrollDirection: NgTableScrollDirection = 'vertical';
  @Input() rowGroupMode: NgTableRowGroupMode;
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() virtualScrollDelay: number = 250;
  @Input() frozenWidth: string;
  @Input() responsive: boolean;
  @Input() contextMenu: any;
  @Input() resizableColumns: boolean = false;
  @Input() columnResizeMode: NgTableColumnResizeMode = 'fit';
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
  @Input() stateStorage: NgTableStateStorage = 'session';
  @Input() groupRowsBy: any;
  @Input() groupRowsByOrder: number = 1;
  @Input() responsiveLayout: NgTableResponsiveLayout = 'scroll';
  @Input() breakpoint: string = '640px';
  @Input() paginatorLocale: string;
  @Input() first: number;
  @Input() rows: number;
  @Input() totalRecords: number;
  @Input() sortField: string;
  @Input() sortOrder: number;
  @Input() multiSortMeta: PrimeSortMeta[];
  @Input() selection: any;
  @Input() selectAll: boolean;
  @Input() virtualRowHeight: number;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() selectAllChange = new EventEmitter<PrimeTableSelectAllChangeEvent>();
  @Output() onRowSelect = new EventEmitter<PrimeTableRowSelectEvent>();
  @Output() onRowUnselect = new EventEmitter<PrimeTableRowUnSelectEvent>();
  @Output() onSort = new EventEmitter<{ multisortmeta: PrimeSortMeta[] } | any>();
  @Output() onPage = new EventEmitter<PrimeTablePageEvent>();
  @Output() onFilter = new EventEmitter<PrimeTableFilterEvent>();
  @Output() onLazyLoad = new EventEmitter<NgAsyncEvent<PrimeTableLazyLoadEvent>>();
  @Output() onRowExpand = new EventEmitter<PrimeTableRowExpandEvent>();
  @Output() onRowCollapse = new EventEmitter<PrimeTableRowCollapseEvent>();
  @Output() onContextMenuSelect = new EventEmitter<PrimeTableContextMenuSelectEvent>();
  @Output() onColResize = new EventEmitter<PrimeTableColResizeEvent>();
  @Output() onColReorder = new EventEmitter<PrimeTableColumnReorderEvent>();
  @Output() onRowReorder = new EventEmitter<PrimeTableRowReorderEvent>();
  @Output() onHeaderCheckboxToggle = new EventEmitter<PrimeTableHeaderCheckboxToggleEvent>();
  @Output() sortFunction = new EventEmitter<any>();
  @Output() firstChange = new EventEmitter<number>();
  @Output() rowsChange = new EventEmitter<number>();
  @Output() onStateSave = new EventEmitter<PrimeTableState>();
  @Output() onStateRestore = new EventEmitter<PrimeTableState>();
  @Output() onTableReady = new EventEmitter<PrimeTable>();
  @Output() contextMenuSelectionChange = new EventEmitter<PrimeTableContextMenuSelectionChangeEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;
  @ViewChild('dataTable', {static: true}) dataTable: PrimeTable;

  captionTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  headerGroupedTemplate: TemplateRef<any>;
  bodyTemplate: TemplateRef<any>;
  loadingBodyTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  footerGroupedTemplate: TemplateRef<any>;
  summaryTemplate: TemplateRef<any>;
  colGroupTemplate: TemplateRef<any>;
  rowExpansionTemplate: TemplateRef<any>;
  groupHeaderTemplate: TemplateRef<any>;
  groupFooterTemplate: TemplateRef<any>;
  frozenHeaderTemplate: TemplateRef<any>;
  frozenBodyTemplate: TemplateRef<any>;
  frozenFooterTemplate: TemplateRef<any>;
  frozenColGroupTemplate: TemplateRef<any>;
  frozenExpandedRowTemplate: TemplateRef<any>;
  emptyMessageTemplate: TemplateRef<any>;
  paginatorLeftTemplate: TemplateRef<any>;
  paginatorRightTemplate: TemplateRef<any>;
  paginatorDropdownIconTemplate: TemplateRef<any>;
  paginatorDropdownItemTemplate: TemplateRef<any>;
  paginatorFirstPageLinkIconTemplate: TemplateRef<any>;
  paginatorLastPageLinkIconTemplate: TemplateRef<any>;
  paginatorPreviousPageLinkIconTemplate: TemplateRef<any>;
  paginatorNextPageLinkIconTemplate: TemplateRef<any>;
  loadingIconTemplate: TemplateRef<any>;
  reorderIndicatorUpIconTemplate: TemplateRef<any>;
  reorderIndicatorDownIconTemplate: TemplateRef<any>;
  sortIconTemplate: TemplateRef<any>;
  checkboxIconTemplate: TemplateRef<any>;
  headerCheckboxIconTemplate: TemplateRef<any>;
  cellTemplates: Record<string, TemplateRef<any>> = {}
  loading: boolean;
  activeSortField: string;

  ngOnInit() {
    this.onTableReady.emit(this.dataTable);
    this.actionsConfig.actions = this.actionsConfig?.actions.filter(action => action.visible ?? true) || [];
    this.colDef = this.colDef.filter(col => col.visible ?? true);
    this.colDef.forEach(conf => {
      if (conf.filter?.type == 'slider') {
        Object.assign(conf.filter, {sliderValue: conf.filter.range ? [conf.filter.min || 0, conf.filter.max || 100] : conf.filter.max})
      }
    })
  }

  _onSort(event: PrimeTableSortEvent) {
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
      switch (item.getType()) {
        case 'caption':
          this.captionTemplate = item.templateRef;
          break;

        case 'header':
          this.headerTemplate = item.templateRef;
          break;

        case 'headergrouped':
          this.headerGroupedTemplate = item.templateRef;
          break;

        case 'body':
          this.bodyTemplate = item.templateRef;
          break;

        case 'loadingbody':
          this.loadingBodyTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'footergrouped':
          this.footerGroupedTemplate = item.templateRef;
          break;

        case 'summary':
          this.summaryTemplate = item.templateRef;
          break;

        case 'colgroup':
          this.colGroupTemplate = item.templateRef;
          break;

        case 'rowexpansion':
          this.rowExpansionTemplate = item.templateRef;
          break;

        case 'groupheader':
          this.groupHeaderTemplate = item.templateRef;
          break;

        case 'groupfooter':
          this.groupFooterTemplate = item.templateRef;
          break;

        case 'frozenheader':
          this.frozenHeaderTemplate = item.templateRef;
          break;

        case 'frozenbody':
          this.frozenBodyTemplate = item.templateRef;
          break;

        case 'frozenfooter':
          this.frozenFooterTemplate = item.templateRef;
          break;

        case 'frozencolgroup':
          this.frozenColGroupTemplate = item.templateRef;
          break;

        case 'frozenrowexpansion':
          this.frozenExpandedRowTemplate = item.templateRef;
          break;

        case 'emptymessage':
          this.emptyMessageTemplate = item.templateRef;
          break;

        case 'paginatorleft':
          this.paginatorLeftTemplate = item.templateRef;
          break;

        case 'paginatorright':
          this.paginatorRightTemplate = item.templateRef;
          break;

        case 'paginatordropdownicon':
          this.paginatorDropdownIconTemplate = item.templateRef;
          break;

        case 'paginatordropdownitem':
          this.paginatorDropdownItemTemplate = item.templateRef;
          break;

        case 'paginatorfirstpagelinkicon':
          this.paginatorFirstPageLinkIconTemplate = item.templateRef;
          break;

        case 'paginatorlastpagelinkicon':
          this.paginatorLastPageLinkIconTemplate = item.templateRef;
          break;

        case 'paginatorpreviouspagelinkicon':
          this.paginatorPreviousPageLinkIconTemplate = item.templateRef;
          break;

        case 'paginatornextpagelinkicon':
          this.paginatorNextPageLinkIconTemplate = item.templateRef;
          break;

        case 'loadingicon':
          this.loadingIconTemplate = item.templateRef;
          break;

        case 'reorderindicatorupicon':
          this.reorderIndicatorUpIconTemplate = item.templateRef;
          break;

        case 'reorderindicatordownicon':
          this.reorderIndicatorDownIconTemplate = item.templateRef;
          break;

        case 'sorticon':
          this.sortIconTemplate = item.templateRef;
          break;

        case 'checkboxicon':
          this.checkboxIconTemplate = item.templateRef;
          break;

        case 'headercheckboxicon':
          this.headerCheckboxIconTemplate = item.templateRef;
          break;

        default:
          this.cellTemplates[item.getType()] = item.templateRef
          break;
      }
    })
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onLazyLoad(event: PrimeTableLazyLoadEvent) {
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

  onSelectAllChange(event: PrimeTableSelectAllChangeEvent) {
    this.selectAll = event.checked;
    this.selectAllChange.emit(event);
  }

  onSelectionChange(event: any[]) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
  }

  onContextMenuSelectionChange(event: PrimeTableContextMenuSelectionChangeEvent) {
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

  onChangeFilterValue(event: any, filterCallback: Function, col: NgTableColDef) {
    let filterValue;
    switch (col.filter.type) {
      case 'text':
        const inputElement = event.target as HTMLInputElement;
        filterValue = inputElement.value;
        break;
      case 'multi-select':
      case 'dropdown':
        filterValue = event.value;
        break;
      case 'boolean':
        filterValue = event.checked;
        break;
      case 'slider':
        filterValue = event.values;
        break;
      case 'gregorian-datepicker':
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

  handleCellStyle(cellStyle: Function | NgCssObject, item: any) {
    if (typeof cellStyle == 'function')
      return cellStyle(item);
    else {
      return cellStyle
    }
  }

  handleCellRenderer(col: NgTableColDef, item: any) {
    if (col.render && typeof col.render.as == 'function')
      return col.render.as(item);
    else {
      return this.resolveFieldData(item, col.field)
    }
  }

  handleActionVisibility(action: NgTableAction, item: any) {
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

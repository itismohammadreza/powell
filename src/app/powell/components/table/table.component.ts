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
  NgEmptyIcon,
  NgOrientation,
  NgSize,
  NgTableAction,
  NgTableActionsConfig,
  NgTableColDef,
  NgTableColumnResizeMode,
  NgTableCompareSelectionBy,
  NgTableContextMenuSelectionMode,
  NgTableFilterDisplay,
  NgTablePaginationPosition,
  NgTableResponsiveLayout,
  NgTableRowExpandMode,
  NgTableRowGroupMode,
  NgTableSelectionMode,
  NgTableSortMode,
  NgTableStateStorage
} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {
  PrimeFilterMetadata,
  PrimeScrollerOptions,
  PrimeSortFunctionEvent,
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
  @Input() responsiveLayout: NgTableResponsiveLayout = 'scroll';
  @Input() breakpoint: string = '960px';
  @Input() style: any;
  @Input() styleClass: string;
  @Input() tableStyle: any;
  @Input() tableStyleClass: string;
  @Input() paginator: boolean;
  @Input() totalRecords: number;
  @Input() pageLinks: number = 5;
  @Input() rowsPerPageOptions: any[];
  @Input() alwaysShowPaginator: boolean = true;
  @Input() showFirstLastIcon: boolean = true;
  @Input() paginatorPosition: NgTablePaginationPosition = 'bottom';
  @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';
  @Input() showCurrentPageReport: boolean;
  @Input() showJumpToPageDropdown: boolean;
  @Input() showJumpToPageInput: boolean;
  @Input() showPageLinks: boolean = true;
  @Input() sortMode: NgTableSortMode = 'single';
  @Input() sortField: string;
  @Input() sortOrder: number = 1;
  @Input() multiSortMeta: PrimeSortMeta[];
  @Input() rowGroupMode: NgTableRowGroupMode;
  @Input() groupRowsBy: string | string[];
  @Input() groupRowsByOrder: number = 1;
  @Input() defaultSortOrder: number = 1;
  @Input() customSort: boolean;
  @Input() showInitialSortBadge: boolean;
  @Input() selectionMode: NgTableSelectionMode;
  @Input() selectionPageOnly: boolean;
  @Input() contextMenuSelectionMode: NgTableContextMenuSelectionMode = 'separate';
  @Input() dataKey: string;
  @Input() metaKeySelection: boolean;
  @Input() rowSelectable: Function;
  @Input() rowTrackBy: Function = (index: number, item: any) => index;
  @Input() lazy: boolean;
  @Input() lazyLoadOnInit: boolean = true;
  @Input() compareSelectionBy: NgTableCompareSelectionBy = 'deepEquals';
  @Input() csvSeparator: string = ',';
  @Input() exportFilename: string = 'download';
  @Input() filters: { [s: string]: PrimeFilterMetadata | PrimeFilterMetadata[] } = {};
  @Input() filterDelay: number = 300;
  @Input() globalFilterFields: string[];
  @Input() filterLocale: string;
  @Input() expandedRowKeys: { [s: string]: boolean; } = {};
  @Input() rowExpandMode: NgTableRowExpandMode = 'multiple';
  @Input() scrollable: boolean;
  @Input() scrollDirection: NgOrientation = "vertical";
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean;
  @Input() virtualScrollDelay: number = 250;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: PrimeScrollerOptions;
  @Input() contextMenu: any;
  @Input() resizableColumns: boolean = true;
  @Input() columnResizeMode: NgTableColumnResizeMode = 'fit';
  @Input() reorderableColumns: boolean;
  @Input() loadingIcon: string = 'pi pi-spinner pi-spin';
  @Input() showLoader: boolean = true;
  @Input() rowHover: boolean;
  @Input() paginatorDropdownAppendTo: any;
  @Input() paginatorDropdownScrollHeight: string = '200px';
  @Input() autoLayout: boolean;
  @Input() resetPageOnSort: boolean = true;
  @Input() exportFunction: Function;
  @Input() stateKey: string;
  @Input() stateStorage: NgTableStateStorage = 'session';
  @Input() exportHeader: string;
  @Output() onTableReady = new EventEmitter<PrimeTable>();
  @Output() onRowSelect = new EventEmitter<PrimeTableRowSelectEvent>();
  @Output() onRowUnselect = new EventEmitter<PrimeTableRowUnSelectEvent>();
  @Output() onPage = new EventEmitter<PrimeTablePageEvent>();
  @Output() onSort = new EventEmitter<PrimeTableSortEvent>();
  @Output() onFilter = new EventEmitter<PrimeTableFilterEvent>();
  @Output() onLazyLoad = new EventEmitter<NgAsyncEvent<PrimeTableLazyLoadEvent>>();
  @Output() onRowExpand = new EventEmitter<PrimeTableRowExpandEvent>();
  @Output() onRowCollapse = new EventEmitter<PrimeTableRowCollapseEvent>();
  @Output() onContextMenuSelect = new EventEmitter<PrimeTableContextMenuSelectEvent>();
  @Output() onColResize = new EventEmitter<PrimeTableColResizeEvent>();
  @Output() onColReorder = new EventEmitter<PrimeTableColumnReorderEvent>();
  @Output() onRowReorder = new EventEmitter<PrimeTableRowReorderEvent>();
  @Output() onHeaderCheckboxToggle = new EventEmitter<PrimeTableHeaderCheckboxToggleEvent>();
  @Output() onStateSave = new EventEmitter<PrimeTableState>();
  @Output() onStateRestore = new EventEmitter<PrimeTableState>();
  @Output() sortFunction = new EventEmitter<PrimeSortFunctionEvent>();
  // two-way bindings
  @Input() rows: number;
  @Input() first: number = 0;
  @Input() selectAll: boolean;
  @Input() selection: any[];
  @Input() contextMenuSelection: any;
  @Output() firstChange = new EventEmitter<number>();
  @Output() rowsChange = new EventEmitter<number>();
  @Output() selectAllChange = new EventEmitter<PrimeTableSelectAllChangeEvent>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() contextMenuSelectionChange = new EventEmitter<PrimeTableContextMenuSelectionChangeEvent>();

  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;
  @ViewChild('dataTable', {static: true}) dataTable: PrimeTable;

  captionTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  headerGroupedTemplate: TemplateRef<any>;
  bodyTemplate: TemplateRef<any>;
  footerGroupedTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;
  summaryTemplate: TemplateRef<any>;
  rowExpansionTemplate: TemplateRef<any>;
  frozenBodyTemplate: TemplateRef<any>;
  frozenRowExpansionTemplate: TemplateRef<any>;
  groupHeaderTemplate: TemplateRef<any>;
  groupFooterTemplate: TemplateRef<any>;
  emptyMessageTemplate: TemplateRef<any>;
  paginatorLeftTemplate: TemplateRef<any>;
  paginatorRightTemplate: TemplateRef<any>;
  loadingBodyTemplate: TemplateRef<any>;
  cellTemplates: { [key: string]: TemplateRef<any> } = {}
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
    this.templates.forEach((item: TemplateDirective) => {
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

        case 'footergrouped':
          this.footerGroupedTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'summary':
          this.summaryTemplate = item.templateRef;
          break;

        case 'rowexpansion':
          this.rowExpansionTemplate = item.templateRef;
          break;

        case 'frozenbody':
          this.frozenBodyTemplate = item.templateRef;
          break;

        case 'frozenrowexpansion':
          this.frozenRowExpansionTemplate = item.templateRef;
          break;

        case 'groupheader':
          this.groupHeaderTemplate = item.templateRef;
          break;

        case 'groupfooter':
          this.groupFooterTemplate = item.templateRef;
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

        case 'loadingbody':
          this.loadingBodyTemplate = item.templateRef;
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

  handleCellStyle(cellStyle: Function | any, item: any) {
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

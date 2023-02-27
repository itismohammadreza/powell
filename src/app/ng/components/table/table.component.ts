import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {NgEmptyIcon, NgOrientation, NgSelectionMode, NgSize} from '@ng/models/offset';
import {
  NgTableAction,
  NgTableActionsConfig,
  NgTableColDef,
  NgTableColumnResizeMode,
  NgTableCompareSelectionBy,
  NgTableContextMenuSelectionMode,
  NgTableFilterDisplay,
  NgTablePaginationPosition,
  NgTableResponsiveLayout,
  NgTableRowGroupMode,
  NgTableSortMode
} from '@ng/models/table';
import {FilterMetadata, SortMeta} from 'primeng/api';
import {Table} from 'primeng/table';
import {TemplateDirective} from "@ng/directives/template.directive";
import {ScrollerOptions} from "primeng/scroller";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() items: any[];
  @Input() filterDisplay: NgTableFilterDisplay = 'menu';
  @Input() colDef: NgTableColDef[];
  @Input() reorderableRows: boolean;
  @Input() selectableRows: boolean;
  @Input() actionsConfig: NgTableActionsConfig;
  @Input() rtl: boolean = this.configService.getConfig().rtl;
  @Input() emptyMessage: string = 'موردی وجود ندارد';
  @Input() emptyIcon: string;
  @Input() emptyImageSrc: string;
  @Input() emptyImageType: NgEmptyIcon = 'box1';
  @Input() header: string;
  @Input() globalFilter: boolean;
  @Input() globalFilterPlaceholder: string;
  @Input() size: NgSize = 'sm';
  @Input() gridlines: boolean = true;
  @Input() striped: boolean;
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
  @Input() multiSortMeta: SortMeta[];
  @Input() rowGroupMode: NgTableRowGroupMode;
  @Input() groupRowsBy: string | string[];
  @Input() groupRowsByOrder: number = 1;
  @Input() defaultSortOrder: number = 1;
  @Input() customSort: boolean;
  @Input() showInitialSortBadge: boolean = true;
  @Input() selectionMode: NgSelectionMode;
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
  @Input() filters: { [s: string]: FilterMetadata | FilterMetadata[] } = {};
  @Input() filterDelay: number = 300;
  @Input() globalFilterFields: string[];
  @Input() filterLocale: string;
  @Input() expandedRowKeys: { [s: string]: boolean; } = {};
  @Input() rowExpandMode: string = 'multiple';
  @Input() scrollable: boolean;
  @Input() scrollDirection: NgOrientation = "vertical";
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean;
  @Input() virtualScrollDelay: number = 250;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: ScrollerOptions;
  @Input() contextMenu: any;
  @Input() resizableColumns: boolean = true;
  @Input() columnResizeMode: NgTableColumnResizeMode = 'fit';
  @Input() reorderableColumns: boolean;
  @Input() loading: boolean;
  @Input() loadingIcon: string = 'pi pi-spinner';
  @Input() showLoader: boolean = true;
  @Input() rowHover: boolean;
  @Input() paginatorDropdownAppendTo: any;
  @Input() paginatorDropdownScrollHeight: string = '200px';
  @Input() autoLayout: boolean;
  @Input() resetPageOnSort: boolean = true;
  @Input() exportFunction: Function;
  @Input() stateKey: string;
  @Input() stateStorage: 'session' | 'local' = 'session';
  @Input() exportHeader: string;
  @Output() onTableReady = new EventEmitter();
  @Output() onRowSelect = new EventEmitter();
  @Output() onRowUnselect = new EventEmitter();
  @Output() onPage = new EventEmitter()
  @Output() onSort = new EventEmitter()
  @Output() onFilter = new EventEmitter()
  @Output() onLazyLoad = new EventEmitter()
  @Output() onRowExpand = new EventEmitter()
  @Output() onRowCollapse = new EventEmitter()
  @Output() onContextMenuSelect = new EventEmitter()
  @Output() onColResize = new EventEmitter()
  @Output() onColReorder = new EventEmitter()
  @Output() onRowReorder = new EventEmitter()
  @Output() onHeaderCheckboxToggle = new EventEmitter()
  @Output() onStateSave = new EventEmitter()
  @Output() onStateRestore = new EventEmitter()
  @Output() sortFunction = new EventEmitter();
  // two-way bindings
  @Input() rows: number;
  @Input() first: number = 0;
  @Input() selectAll: boolean;
  @Input() selection: any;
  @Input() contextMenuSelection: any;
  @Output() firstChange = new EventEmitter();
  @Output() rowsChange = new EventEmitter();
  @Output() selectAllChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() contextMenuSelectionChange = new EventEmitter();

  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;
  @ViewChild('dataTable', {static: true}) dataTable: Table;

  captionTemplate: TemplateRef<any>
  headerTemplate: TemplateRef<any>
  headerGroupedTemplate: TemplateRef<any>
  bodyTemplate: TemplateRef<any>
  footerGroupedTemplate: TemplateRef<any>
  footerTemplate: TemplateRef<any>
  summaryTemplate: TemplateRef<any>
  rowExpansionTemplate: TemplateRef<any>
  frozenBodyTemplate: TemplateRef<any>
  frozenRowExpansionTemplate: TemplateRef<any>
  groupHeaderTemplate: TemplateRef<any>
  groupFooterTemplate: TemplateRef<any>
  emptyMessageTemplate: TemplateRef<any>
  paginatorLeftTemplate: TemplateRef<any>
  paginatorRightTemplate: TemplateRef<any>
  loadingBodyTemplate: TemplateRef<any>
  cellTemplates: { [key: string]: TemplateRef<any> } = {}

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.onTableReady.emit(this.dataTable);
    this.colDef = this.colDef.filter(col => col.visible != undefined ? col.visible : true);
    this.colDef.forEach(conf => {
      if (conf.filter?.type == 'slider') {
        Object.assign(conf.filter, {sliderValue: conf.filter.range ? [conf.filter.min || 0, conf.filter.max || 100] : conf.filter.max})
      }
    })
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

  onPageChange(event) {
    this.onPage.emit(event)
  }

  onFirstChange(event) {
    this.first = event;
    this.firstChange.emit(this.firstChange);
  }

  onRowsChange(event) {
    this.rows = event;
    this.rowsChange.emit(this.rows);
  }

  onSelectAllChange(event) {
    this.selectAll = event;
    this.selectAllChange.emit(this.selectAll);
  }

  onSelectionChange(event) {
    this.selection = event;
    this.selectionChange.emit(this.selection);
  }

  onContextMenuSelectionChange(event) {
    this.contextMenuSelection = event;
    this.contextMenuSelectionChange.emit(this.contextMenuSelection);
  }

  resolveFieldData(obj: any, field: string | string[], value?: any) {
    if (typeof field == 'string')
      return this.resolveFieldData(obj, field.split('.'), value);
    else if (field.length == 1 && value !== undefined)
      return obj[field[0]] = value;
    else if (field.length == 0)
      return obj;
    else
      return this.resolveFieldData(obj[field[0]], field.slice(1), value);
  }

  onChangeFilterValue(event: any, filterCallback: Function, col: NgTableColDef) {
    let filterValue;
    switch (col.filter.type) {
      case 'multi-select':
      case 'dropdown':
      case 'text':
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
      this.onFilter.emit({value: filterValue, col})
    }
  }

  handleCellStyleClass(cellStyleClass: Function | string, item: any) {
    if (typeof cellStyleClass == 'function')
      return cellStyleClass(item);
    else {
      return cellStyleClass
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
      return action.visible != undefined ? action.visible : true;
    }
  }

  onGlobalFilterChange(event: any) {
    this.dataTable.filterGlobal(event.target.value, 'contains')
  }
}

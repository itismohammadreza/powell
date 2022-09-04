import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {NgSelectionMode} from '@ng/models/offset';
import {NgColDef} from '@ng/models/table';
import {FilterMetadata, SortMeta} from 'primeng/api';
import {Table} from 'primeng/table';
import {TemplateDirective} from "@ng/directives/template.directive";
import {ScrollerOptions} from "primeng/scroller";


// todo:
// -implement cell renderer + templateString functions
// -implement actions and functions to render + switch action
// -check that let- variables on ng-templates are setting properly. some is missed or some is wrong.
// -implement empty message if user not provided
// -implement default table header (include a title) if user not provided
// -implement grid lines or other style classes configurations
// -implement edit

// implemented
// -selection
// -reorderableRows
// -reorderableColumns
@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() items: any[];
  @Input() filterDisplay: 'row' | 'menu' = 'menu';
  @Input() colDef: NgColDef[];
  @Input() reorderableRows: boolean = false;
  @Input() selectableRows: boolean = true;
  @Input() local: boolean = true;
  // native properties
  @Input() frozenColumns: any[];
  @Input() frozenValue: any[];
  @Input() responsiveLayout: 'stack' | 'scroll' = 'scroll';
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
  @Input() paginatorPosition: 'bottom' | 'top' | 'both' = 'bottom';
  @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';
  @Input() showCurrentPageReport: boolean;
  @Input() showJumpToPageDropdown: boolean;
  @Input() showJumpToPageInput: boolean;
  @Input() showPageLinks: boolean = true;
  @Input() sortMode: 'single' | 'multiple' = 'single';
  @Input() sortField: string;
  @Input() sortOrder: number = 1;
  @Input() multiSortMeta: SortMeta[];
  @Input() rowGroupMode: 'subheader' | 'rowspan';
  @Input() groupRowsBy: string | string[];
  @Input() groupRowsByOrder: number = 1;
  @Input() defaultSortOrder: number = 1;
  @Input() showInitialSortBadge: boolean = true;
  @Input() selectionMode: NgSelectionMode;
  @Input() selectionPageOnly: boolean;
  @Input() contextMenuSelectionMode: 'separate' | 'joint' = 'separate';
  @Input() dataKey: string;
  @Input() metaKeySelection: boolean;
  @Input() rowSelectable: Function;
  @Input() rowTrackBy: Function = (index: number, item: any) => item;
  @Input() lazy: boolean = false;
  @Input() lazyLoadOnInit: boolean = true;
  @Input() compareSelectionBy: 'equals' | 'deepEquals' = 'deepEquals';
  @Input() csvSeparator: string = ',';
  @Input() exportFilename: string = 'download';
  @Input() filters: { [s: string]: FilterMetadata | FilterMetadata[] } = {};
  @Input() filterDelay: number = 300;
  @Input() globalFilterFields: string[];
  @Input() filterLocale: string;
  @Input() expandedRowKeys: { [s: string]: boolean; } = {};
  @Input() rowExpandMode: string = 'multiple';
  @Input() scrollable: boolean;
  @Input() scrollDirection: string = "vertical";
  @Input() scrollHeight: string;
  @Input() virtualScroll: boolean;
  @Input() virtualScrollDelay: number = 250;
  @Input() virtualScrollItemSize: number;
  @Input() virtualScrollOptions: ScrollerOptions;
  @Input() contextMenu: any;
  @Input() resizableColumns: boolean;
  @Input() columnResizeMode: 'expand' | 'fit' = 'fit';
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
  @Input() editMode: 'cell' | 'row' = 'cell';
  @Input() editingRowKeys: { [s: string]: boolean; } = {};
  @Input() exportHeader: string;
  @Output() onTableReady = new EventEmitter();
  @Output() onRowSelect = new EventEmitter()
  @Output() onRowUnselect = new EventEmitter()
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
  @Output() onEditInit = new EventEmitter()
  @Output() onEditComplete = new EventEmitter()
  @Output() onEditCancel = new EventEmitter()
  @Output() onHeaderCheckboxToggle = new EventEmitter()
  @Output() onStateSave = new EventEmitter()
  @Output() onStateRestore = new EventEmitter()
  @Output() sortFunction: EventEmitter<any> = new EventEmitter();
  // two-way bindings
  @Input() rows: number;
  @Input() first: number;
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
  footerTemplate: TemplateRef<any>
  footerGroupedTemplate: TemplateRef<any>
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

  constructor() {
  }

  ngOnInit() {
    this.onTableReady.emit(this.dataTable);
    this.colDef.forEach(conf => {
      if (conf.filter && conf.filter.type == 'slider' && conf.filter.range) {
        Object.assign(conf.filter, {sliderValue: [conf.filter.min || 0, conf.filter.max || 100]})
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
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

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;

        case 'footergrouped':
          this.footerGroupedTemplate = item.templateRef;
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
      }
    })
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
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

  fromObj(data: any, field: string | string[]) {
    if (data && field) {
      if (typeof field == 'string') {
        return this.fromObj(data, field.split('.'));
      } else if (field.length == 0) {
        return data;
      } else {
        return this.fromObj(data[field[0]], field.slice(1));
      }
    } else {
      return null;
    }
  }

  onChangeFilterValue(event: any, filterCallback: Function, col: NgColDef) {
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
        console.log(event.toString())
        break;
    }
    if (this.local) {
      filterCallback(filterValue.toString());
    } else {
      this.onFilter.emit({value: filterValue, col})
    }
  }

  onImageLoadError(event: any) {
    event.target.onerror = null;
    event.target.src = "assets/images/no-image-placeholder.jpg";
    event.target.style.width = "100px"
  }

  // @Input() emptyMessage: string = 'No Records Found';
  // @Input() header: string;
  // @Input() stickyTopOffset: string;
  // @Input() actions: NgTableAction[];
  // @Input() exportCsvBtn: boolean;
  // @Input() exportExcelBtn: boolean;
  // @Input() exportPdfBtn: boolean;
  // @Input() exportSelectionBtn: boolean;
  // @Input() resetBtn: boolean;
  // @Input() globalFilterPlaceholder: string = 'Search';
  // @Input() actionsColumnHeader: string = 'عملیات';
  // @Input() rtl: boolean;
  // @Input() striped: boolean = true;
  // @Input() gridlines: boolean = true;
  // @Input() size: NgSize = 'sm';
  // @Input() colDef: NgColDef[];
  // @Input() rows: number = 5000;
  // @Input() dataKey: string;
  // @Input() globalFilterFields: string[];
  // @Input() loading: boolean;
  // @Input() rowHover: boolean;
  // @Input() autoLayout: boolean;
  // @Input() responsive: boolean = true;
  // @Input() reorderableRows: boolean;
  // @Input() selectableRows: boolean;
  // @Input() selection: any;
  // @Input() selectionMode: NgSelectionMode;
  // @Input() compareSelectionBy: 'equals' | 'deepEquals' = 'deepEquals';
  // @Input() contextMenuItems: MenuItem[];
  // @Input() contextMenuSelection: any;
  // @Input() contextMenuSelectionMode: 'separate' | 'joint' = 'separate';
  // @Input() resizableColumns: boolean;
  // @Input() columnResizeMode: 'fit' | 'expand' = 'expand';
  // @Input() scrollable: boolean;
  // @Input() scrollHeight: string;
  // @Input() stateStorage: 'session' | 'local';
  // @Input() stateKey: string;
  // @Input() filterDelay: number = 0;
  // @Input() rowTrackBy: any;
  // @Input() sortMode: NgSelectionMode = 'single';
  // @Input() defaultSortOrder: number = 1;
  // @Input() resetPageOnSort: boolean = true;
  // @Input() multiSortMeta: SortMeta[];
  // @Input() sortOrder: number = 1;
  // @Input() sortField: string;
  // @Input() exportFilename: string = 'download';
  // @Input() csvSeparator: string = ',';
  // @Input() paginator: boolean = true;
  // @Input() first: number = 0;
  // @Input() alwaysShowPaginator: boolean;
  // @Input() paginatorPosition: NgPosition = 'bottom';
  // @Input() showPageLinks: boolean = true;
  // @Input() showJumpToPageDropdown: boolean = true;
  // @Input() pageLinks: number = 0;
  // @Input() showFirstLastIcon: boolean = true;
  // @Input() totalRecords: number = 0;
  // @Input() paginatorDropdownAppendTo: any;
  // @Input() currentPageReportTemplate: string = '{first}-{last} of {totalRecords}';
  // @Input() rowsPerPageOptions: number[] = [10, 20, 50];
  // @Output() onFileButtonClick = new EventEmitter();
  // @Output() contextMenuSelectionChange = new EventEmitter();
  // @Output() onContextMenuSelect = new EventEmitter();
  // @Output() selectionChange = new EventEmitter();
  // @Output() onRowSelect = new EventEmitter();
  // @Output() onRowUnselect = new EventEmitter();
  // @Output() onPage = new EventEmitter();
  // @Output() onSort = new EventEmitter();
  // @Output() onFilter = new EventEmitter();
  // @Output() onColResize = new EventEmitter();
  // @Output() onColReorder = new EventEmitter();
  // @Output() onRowReorder = new EventEmitter();
  // @Output() onEditInit = new EventEmitter();
  // @Output() onEditComplete = new EventEmitter();
  // @Output() onEditCancel = new EventEmitter();
  // @Output() onHeaderCheckboxToggle = new EventEmitter();
  // @Output() onStateSave = new EventEmitter();
  // @Output() onStateRestore = new EventEmitter();
  // @Output() onActionClick = new EventEmitter();
  // @ViewChild('dt') table: Table;
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.items) {
  //     this.items = changes.items.currentValue;
  //   }
  // }
  //
  // emitter(name: string, event: any) {
  //   (this[name] as EventEmitter<any>).emit(event);
  // }
  //
  // onSelectionChange(event) {
  //   this.selection = event;
  //   this.selectionChange.emit(this.selection);
  // }
  //
  // onContextMenuSelectionChange(event) {
  //   this.contextMenuSelection = event;
  //   this.contextMenuSelectionChange.emit(this.contextMenuSelection);
  // }
  //
  // onCellEdit(rowData: any, field: string, newValue: any) {
  //   this.fromObj(rowData, field, newValue);
  // }
  //
  // getClass(rowData: any, item: NgTableAction): string[] {
  //   const result = [item.className || ''];
  //   for (const config of item.classConfigs) {
  //     result.push(config.tobe.some(
  //         (t) => t === this.fromObj(rowData, config.field || [])
  //       )
  //         ? config.class
  //         : ''
  //     );
  //   }
  //   return result;
  // }
  //
  // fileButtonClick(rowData: any, col: NgColDef) {
  //   if (col.renderer.fileButtonDefaultBehavior) {
  //     window.open(this.fromObj(rowData, col.field));
  //   } else {
  //     this.onFileButtonClick.emit(rowData);
  //   }
  // }
  //
  // get hasCaption() {
  //   return (
  //     this.header ||
  //     this.globalFilterFields ||
  //     this.exportCsvBtn ||
  //     this.exportExcelBtn ||
  //     this.exportPdfBtn ||
  //     this.exportSelectionBtn ||
  //     this.resetBtn
  //   );
  // }
}

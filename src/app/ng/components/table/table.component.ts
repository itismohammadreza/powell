import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {NgPosition, NgSelectionMode, NgSize} from '@ng/models/offset';
import {NgColDef} from '@ng/models/table';
import {MenuItem, SortMeta} from 'primeng/api';
import {Table} from 'primeng/table';
import {NgTableAction} from '@ng/models/table';

@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnChanges {
  @Input() items: any[];
  @Input() filterDisplay: 'row' | 'menu' = 'menu';
  @Input() colDef: NgColDef[];
  @Input() disableSelectionField: string = 'disableSelection';
  @Input() reorderableColumns: boolean = true;
  @Input() reorderableRows: boolean = true;
  @Input() local: boolean = true;
  @Input() selectionMode: NgSelectionMode = 'single';

  ngOnChanges(changes: SimpleChanges) {
  }

  fromObj(data: any, field: string | string[], value?: any) {
    if (data && field) {
      if (typeof field == 'string') {
        return this.fromObj(data, field.split('.'), value);
      } else if (field.length == 1 && value !== undefined) {
        return (data[field[0]] = value);
      } else if (field.length == 0) {
        return data;
      } else {
        return this.fromObj(data[field[0]], field.slice(1), value);
      }
    } else {
      return null;
    }
  }

  _onFilter(event: any, filterCallback: any) {
    console.log(event, filterCallback)
  }

  //
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
  // // @Input() colDef: NgColDef[];
  // @Input() rows: number = 5000;
  // @Input() dataKey: string;
  // @Input() globalFilterFields: string[];
  // @Input() loading: boolean;
  // @Input() rowHover: boolean;
  // @Input() autoLayout: boolean;
  // @Input() responsive: boolean = true;
  // // @Input() reorderableRows: boolean;
  // @Input() selectableRows: boolean;
  // @Input() selection: any;
  // // @Input() selectionMode: NgSelectionMode;
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

  //
  // exportPdf() {
  // }
  //
  // exportExcel() {
  // }
  //
  // saveAsExcelFile(buffer: any, fileName: string): void {
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

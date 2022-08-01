import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation,} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {CellButtonComponent} from './cell-button/cell-button.component';
import {CellDatepickerComponent} from './cell-datepicker/cell-datepicker.component';
import {CellImageComponent} from './cell-image/cell-image.component';

@Component({
  selector: 'ng-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnInit {
  public frameworkComponents = {
    buttonRenderer: CellButtonComponent,
    imageRenderer: CellImageComponent,
    dateRenderer: CellDatepickerComponent,
  };
  @Input() columnDefs: ColDef[];
  @Input() rowData: any;
  @Input() pagination: boolean = false;
  @Input() paginationPageSize: number;
  @Input() actionsConfig: any[];
  @Input() imagesConfig: any[];
  @Input() dateConfig: any[];
  // @Input() multiObjectConfig: any[];
  @Input() defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
  };
  @Output() cellValueChanged = new EventEmitter();
  // @Input() objectConfig: any[];
  @Output() actionClick = new EventEmitter();
  @Output() imageSelect = new EventEmitter();
  @Output() imageRemove = new EventEmitter();
  @Output() dateSelect = new EventEmitter();
  // @Output() multiObjectRemove = new EventEmitter();
  @Output() rowDragEnter = new EventEmitter();
  @Output() rowDragMove = new EventEmitter();
  // @Output() objectChange = new EventEmitter();
  // @Output() multiObjectChange = new EventEmitter();
  @Output() rowDragEnd = new EventEmitter();
  @Output() goToNextPage = new EventEmitter();
  @Output() goToPreviousPage = new EventEmitter();
  private gridApi;

  ngOnInit(): void {
    // if (this.objectConfig) {
    //   let mappedList;
    //   this.objectConfig.forEach((config) => {
    //     mappedList = objectMapping(config);
    //     this.columnDefs.push({
    //       field: config.field + '.' + config.formatValue,
    //       headerName: config.headerName,
    //       cellEditor: 'agSelectCellEditor',
    //       editable: true,
    //       cellEditorParams: { values: extractValues(mappedList) },
    //       filterParams: {
    //         valueFormatter: (params) => {
    //           return lookupValue(mappedList, params.value);
    //         },
    //       },
    //       valueFormatter: (params) => {
    //         return lookupValue(mappedList, params.value);
    //       },
    //       valueParser: (params) => {
    //         return lookupKey(mappedList, params.newValue);
    //       },
    //       onCellValueChanged: (params) => {
    //         this.onObjectChange(params);
    //       },
    //     });
    //   });
    // }

    // if (this.multiObjectConfig) {
    //   let mappedList;
    //   this.multiObjectConfig.forEach((config) => {
    //     mappedList = objectMapping(config);
    //     this.columnDefs.push({
    //       field: config.field,
    //       headerName: config.headerName,
    //       cellRenderer: 'multiObjectRenderer',
    //       cellRendererParams: {
    //         available: config.items,
    //         selected: config.items,
    //         fieldToShow: config.formatValue,
    //         columnField: config.field,
    //         onRemove: (params) => {
    //           this.onMultiObjectRemove(params);
    //         },
    //       },
    //       cellEditor: 'agSelectCellEditor',
    //       editable: true,
    //       cellEditorParams: { values: extractValues(mappedList) },
    //       filterParams: {
    //         valueFormatter: (params) => {
    //           return lookupValue(mappedList, params.value);
    //         },
    //       },
    //       valueFormatter: (params) => {
    //         return lookupValue(mappedList, params.value);
    //       },
    //       valueParser: (params) => {
    //         return lookupKey(mappedList, params.newValue);
    //       },
    //       onCellValueChanged: (params) => {
    //         const obj = {};
    //         obj[params.data[config.field]] = mappedList[params.data.partners];
    //         this.onMultiObjectChange({ selected: obj, params });
    //       },
    //     });
    //   });
    // }

    if (this.imagesConfig) {
      this.imagesConfig.forEach((config) => {
        this.columnDefs.push({
          headerName: config.headerName,
          editable: false,
          sortable: false,
          minWidth: 250,
          maxWidth: 250,
          filter: false,
          cellRenderer: 'imageRenderer',
          cellRendererParams: {
            onSelect: this.onSelectImage.bind(this),
            onRemove: this.onRemoveImage.bind(this),
            field: config.field,
            readonly: config.readonly,
            accept: config.accept,
            rtl: config.rtl,
            multiple: config.multiple,
            fileLimit: config.fileLimit,
            resultType: config.resultType,
            chooseLabel: config.chooseLabel,
            seeLabel: config.seeLabel,
          },
        });
      });
    }

    if (this.actionsConfig) {
      this.actionsConfig.forEach((action) => {
        this.columnDefs.push({
          headerName: action.headerName,
          editable: false,
          filter: false,
          sortable: false,
          minWidth: 80,
          maxWidth: 80,
          cellRenderer: 'buttonRenderer',
          cellClass: 'button-renderer',
          cellRendererParams: {
            onClick: this.onActionClick.bind(this),
            action: action.action,
            label: action.label,
            icon: action.icon,
            color: action.color,
          },
        });
      });
    }

    if (this.dateConfig) {
      this.dateConfig.forEach((config) => {
        this.columnDefs.push({
          headerName: config.headerName,
          editable: false,
          sortable: false,
          minWidth: 250,
          maxWidth: 250,
          filter: false,
          cellRenderer: 'dateRenderer',
          cellRendererParams: {
            onSelect: this.onSelectDate.bind(this),
            field: config.field,
            readonly: config.readonly,
            label: config.label,
            locale: config.locale,
            datePickerMode: config.datePickerMode,
          },
        });
      });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onCellValueChanged(event) {
    this.cellValueChanged.emit(event);
  }

  onActionClick(e: any) {
    this.actionClick.emit(e);
  }

  onSelectImage(e: any) {
    this.imageSelect.emit(e);
  }

  onRemoveImage(e: any) {
    this.imageRemove.emit(e);
  }

  onSelectDate(e: any) {
    this.dateSelect.emit(e);
  }

  addTransaction(entity: any) {
    this.gridApi.applyTransaction({ add: [entity] });
  }

  deleteTransaction(entity: any) {
    this.gridApi.applyTransaction({ remove: [entity] });
  }

  updateTransaction(entity: any) {
    this.gridApi.applyTransaction({ update: [entity] });
  }

  // onObjectChange(e: any) {
  //   this.objectChange.emit(e);
  // }

  // onMultiObjectChange(e: any) {
  //   this.multiObjectChange.emit({
  //     selected: e.selected,
  //     rowData: e.params.data,
  //   });
  // }

  // onMultiObjectRemove(params) {
  //   this.multiObjectRemove.emit(params);
  // }

  onColumnResized(params) {
    params.api.resetRowHeights();
  }
}

// function extractValues(mappings) {
//   return Object.keys(mappings);
// }

// function lookupValue(mappings, key) {
//   return mappings[key];
// }

// function lookupKey(mappings, name) {
//   var keys = Object.keys(mappings);
//   for (var i = 0; i < keys.length; i++) {
//     var key = keys[i];
//     if (mappings[key] === name) {
//       return key;
//     }
//   }
// }

// function objectMapping(config) {
//   const obj = {};
//   config.items.forEach((p) => {
//     Object.assign(obj, {
//       [p[config.formatKey]]: p[config.formatValue],
//     });
//   });
//   return obj;
// }

import {Component} from '@angular/core';
import {NgDatePickerMode} from '@ng/models/forms';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import * as moment from 'jalali-moment';

@Component({
  selector: 'cell-datepicker',
  templateUrl: './cell-datepicker.component.html',
  styleUrls: ['./cell-datepicker.component.scss'],
})
export class CellDatepickerComponent implements ICellRendererAngularComp {
  params: any;
  showDialog = false;
  cellValue: string = '-';
  datepickerValue: any;
  readonly: boolean;
  label: string;
  locale: string;
  datePickerMode: NgDatePickerMode;

  agInit(params): void {
    this.params = params;
    this.readonly = params.readonly || false;
    this.label = params.label || 'انتخاب';
    this.locale = params.locale || 'fa';
    const field = params.colDef.field;
    this.cellValue = moment(new Date(params.data[field])).format(
      'jYYYY/jMM/jDD'
    );
    this.datepickerValue = moment(this.cellValue);
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick(event) {
    this.showDialog = true;
  }

  dateChange(event) {
    const selectedDate = event.dateObj as Date;
    this.showDialog = false;
    this.cellValue = moment(selectedDate).format('jYYYY/jMM/jDD');
    const result = {
      selectedDate: selectedDate,
      rowData: this.params.data,
    };
    this.params.onSelect(result);
  }
}

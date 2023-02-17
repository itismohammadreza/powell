import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgAddon, NgLabelPosition} from "@ng/models/forms";
import {NgIconPosition, NgSize} from "@ng/models/offset";
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-gregorian-datepicker-page',
  templateUrl: './gregorian-datepicker.page.html',
  styleUrls: ['./gregorian-datepicker.page.scss']
})
export class GregorianDatepickerPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = NgGlobal.config.filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = NgGlobal.config.labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  selectionMode: "single" | "multiple" | "range" = 'single';
  placeholder: string;
  disabled: boolean = false;
  inline: boolean = false;
  showOtherMonths: boolean = true;
  selectOtherMonths: boolean = false;
  showIcon: boolean = false;
  showOnFocus: boolean = true;
  showWeek: boolean = false;
  datePickerIcon: string = 'pi pi-calendar';
  readonlyInput: boolean = false;
  shortYearCutoff: string = '+10';
  showTime: boolean = false;
  hourFormat: '12' | '24' = '24';
  timeOnly: boolean = false;
  showSeconds: boolean = false;
  stepHour: number = 1;
  stepMinute: number = 1;
  stepSecond: number = 1;
  showButtonBar: boolean = false;
  hideOnDateTimeSelect: boolean = true;
  numberOfMonths: number = 1;
  view: 'date' | 'month' | 'year' = 'date';
  touchUI: boolean = false;
  showClear: boolean = false;
}

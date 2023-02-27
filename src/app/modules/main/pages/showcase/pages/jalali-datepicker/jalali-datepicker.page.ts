import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgAddon, NgLabelPosition} from "@ng/models/forms";
import {NgIconPosition, NgSize} from "@ng/models/offset";
import {MomentService} from "@ng/services";
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-jalali-datepicker-page',
  templateUrl: './jalali-datepicker.page.html',
  styleUrls: ['./jalali-datepicker.page.scss']
})
export class JalaliDatepickerPage {
  form = new FormGroup({
    c1: new FormControl(this.momentService.getJalaliMoment('1396/08/25 21:00', 'jYYYY/jMM/jDD hh:mm'), [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = this.configService.getConfig().inputSize;
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

  constructor(private momentService: MomentService, private configService: ConfigService) {
  }

  submit() {
  }
}

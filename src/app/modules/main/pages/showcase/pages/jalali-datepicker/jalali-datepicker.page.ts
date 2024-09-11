import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from "@powell/models";
import {ConfigService, MomentService} from "@powell/api";

@Component({
  selector: 'ng-jalali-datepicker-page',
  templateUrl: './jalali-datepicker.page.html',
  styleUrls: ['./jalali-datepicker.page.scss']
})
export class JalaliDatepickerPage {
  private configService = inject(ConfigService);
  private momentService = inject(MomentService);

  form = new FormGroup({
    c1: new FormControl(this.momentService.getJalaliMoment('1396/08/25 21:00', 'jYYYY/jMM/jDD hh:mm'), [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.get().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.get().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.get().inputSize;
  followConfig: boolean = this.configService.get().followConfig;
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

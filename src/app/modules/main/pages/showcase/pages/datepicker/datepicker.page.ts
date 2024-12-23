import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from "@powell/models";
import {ConfigService} from "@powell/api";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";
import {DatepickerModule} from "@powell/components/datepicker";
import {$CalendarModule} from "@powell/primeng";

@Component({
  selector: 'ng-datepicker-page',
  templateUrl: './datepicker.page.html',
  styleUrls: ['./datepicker.page.scss'],
  imports: [
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent,
    DatepickerModule,
    $CalendarModule,
    FormsModule
  ]
})
export class DatepickerPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
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
  isJalali: boolean = false;
  disabled: boolean = false;
  inline: boolean = false;
  showOtherMonths: boolean = true;
  selectOtherMonths: boolean = false;
  showIcon: boolean = false;
  showOnFocus: boolean = true;
  showWeek: boolean = false;
  datepickerIcon: string = 'pi pi-calendar';
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
  hideOnDateTimeSelect: boolean = false;
  numberOfMonths: number = 1;
  view: 'date' | 'month' | 'year' = 'date';
  touchUI: boolean = false;
  showClear: boolean = false;
}

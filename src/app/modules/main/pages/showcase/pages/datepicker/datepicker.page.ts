import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";
import {DatepickerComponent, DatepickerModule} from "@powell/components/datepicker";
import {$DatePickerModule} from "@powell/primeng";

@Component({
  selector: 'datepicker-page',
  templateUrl: './datepicker.page.html',
  imports: [
    ReactiveFormsModule,
    PreviewComponent,
    DatepickerModule,
    $DatePickerModule,
  ]
})
export class DatepickerPage extends PreviewBase {
  @ViewChild(DatepickerComponent) declare cmpRef: DatepickerComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'isJalali', value: false},
    {field: 'iconDisplay', selectOptions: 'iconDisplayTypes', value: 'button'},
    {field: 'placeholder', value: ''},
    {field: 'inline', value: false},
    {field: 'showOtherMonths', value: true},
    {field: 'selectOtherMonths', value: false},
    {field: 'showIcon', value: false},
    {field: 'fluid', value: false},
    {field: 'datepickerIcon', value: 'pi pi-calendar'},
    {field: 'readonlyInput', value: false},
    {field: 'hourFormat', selectOptions: 'hourFormats', value: '24'},
    {field: 'timeOnly', value: false},
    {field: 'stepHour', value: 1},
    {field: 'stepMinute', value: 1},
    {field: 'stepSecond', value: 1},
    {field: 'showSeconds', value: false},
    {field: 'showOnFocus', value: true},
    {field: 'showWeek', value: false},
    {field: 'showClear', value: false},
    {field: 'selectionMode', selectOptions: 'selectionModes', value: 'single'},
    {field: 'showButtonBar', value: false},
    {field: 'hideOnDateTimeSelect', value: false},
    {field: 'touchUI', value: false},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputStyle},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'showTime', value: false},
    {field: 'numberOfMonths', value: 1},
    {field: 'view', selectOptions: 'views', value: 'date'},
  ];
}

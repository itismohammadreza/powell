import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgDatePickerMode, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-date-picker-page',
  templateUrl: './date-picker.page.html',
  styleUrls: ['./date-picker.page.scss'],
})
export class DatePickerPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = '';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = false;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  locale: string = 'fa';
  appendTo: any = 'body';
  icon: string = '';
  inputSize: NgSize = 'md';
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  datePickerMode: NgDatePickerMode = 'day';
  inline: boolean = false;
  clearable: boolean = false;
  addon: NgAddon;

  submit() {
  }
}

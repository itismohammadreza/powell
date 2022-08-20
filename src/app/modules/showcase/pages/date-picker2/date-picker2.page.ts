import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ng-date-picker2-page',
  templateUrl: './date-picker2.page.html',
  styleUrls: ['./date-picker2.page.scss']
})
export class DatePicker2Page {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  submit() {
  }
}

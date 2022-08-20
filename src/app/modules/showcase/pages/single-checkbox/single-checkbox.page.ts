import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ng-single-checkbox-page',
  templateUrl: './single-checkbox.page.html',
  styleUrls: ['./single-checkbox.page.scss'],
})
export class SingleCheckboxPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  hint: string = '';
  rtl: boolean = true;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;

  submit() {
  }
}

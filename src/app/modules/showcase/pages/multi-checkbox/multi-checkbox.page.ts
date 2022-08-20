import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';

@Component({
  selector: 'ng-multi-checkbox-page',
  templateUrl: './multi-checkbox.page.html',
  styleUrls: ['./multi-checkbox.page.scss'],
})
export class MultiCheckboxPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  // native properties
  orientation: NgOrientation = 'vertical';
  disabled: boolean = false;
  readonly: boolean = false;

  options: any[];

  submit() {
  }
}

import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-switch-page',
  templateUrl: './switch.page.html',
  styleUrls: ['./switch.page.scss'],
})
export class SwitchPage {
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
  disabled: boolean = false;
  readonly: boolean = false;

  submit() {
  }
}

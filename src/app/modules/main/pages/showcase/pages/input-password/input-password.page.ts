import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-input-password-page',
  templateUrl: './input-password.page.html',
  styleUrls: ['./input-password.page.scss'],
})
export class InputPasswordPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  icon: string = '';
  labelPos: NgLabelPosition = 'fix-side';
  iconPos: NgPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  promptLabel: string = 'لطفا رمز عبور را وارد کنید';
  weakLabel: string = 'ضعیف';
  mediumLabel: string = 'متوسط';
  strongLabel: string = 'قوی';
  feedback: boolean = true;
  toggleMask: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  showClear: boolean = false;
}

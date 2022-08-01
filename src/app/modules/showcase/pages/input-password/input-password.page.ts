import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-input-password-page',
  templateUrl: './input-password.page.html',
  styleUrls: ['./input-password.page.scss'],
})
export class InputPasswordPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  filled: boolean = false;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  icon: string;
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number;
  placeholder: string;
  inputSize: NgSize = 'md';
  promptLabel: string = 'لطفا رمز عبور را وارد کنید';
  weakLabel: string = 'ضعیف';
  mediumLabel: string = 'متوسط';
  strongLabel: string = 'قوی';
  feedback: boolean = true;
  showPassword: boolean = false;
  addon: NgAddon;
}

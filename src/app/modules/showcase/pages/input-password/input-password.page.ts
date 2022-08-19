import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgInputTypes, NgKeyFilter, NgLabelPosition} from '@ng/models/forms';
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



  label: string = 'test';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  iconPos: NgPosition = 'left';
  icon: string = 'pi pi-home';
  inputSize: NgSize = 'md';
  readonly: boolean = false;
  disabled: boolean = false;
  showClear: boolean = false;
  maxlength: number = 2000;
  placeholder: string = '';
  type: NgInputTypes = 'text';
  addon: NgAddon// = {
  //   before: {
  //     type: 'icon',
  //     icon: 'pi pi-home',
  //   },
  //   after: {
  //     type: 'button',
  //     icon: 'pi pi-home',
  //     label: 'test'
  //   }
  // };
  promptLabel: string = 'لطفا رمز عبور را وارد کنید';
  weakLabel: string = 'ضعیف';
  mediumLabel: string = 'متوسط';
  strongLabel: string = 'قوی';
  feedback: boolean = true;
  toggleMask: boolean = false;
}

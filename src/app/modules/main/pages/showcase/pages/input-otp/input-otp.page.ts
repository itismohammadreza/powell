import {Component} from '@angular/core';
import {GlobalConfig} from "@core/global.config";
import {NgAddon, NgFixLabelPosition, NgInputType, NgKeyFilter, NgLabelPosition} from "@ng/models/forms";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NgIconPosition, NgSize} from "@ng/models/offset";

@Component({
  selector: 'ng-input-otp-page',
  templateUrl: './input-otp.page.html',
  styleUrls: ['./input-otp.page.scss']
})
export class InputOtpPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
  fixLabelPos: NgFixLabelPosition = 'fix-side';
  readonly: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  inputCount: number = 4;
  numbersOnly: boolean = true;
}

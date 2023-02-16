import {Component, Inject} from '@angular/core';
import {NgFixLabelPosition} from "@ng/models/forms";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgGlobal} from "@ng/ng-global";
import {NgSize} from "@ng/models/offset";

@Component({
  selector: 'ng-input-otp-page',
  templateUrl: './input-otp.page.html',
  styleUrls: ['./input-otp.page.scss']
})
export class InputOtpPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  inputSize: NgSize = NgGlobal.config.inputSize;
  labelPos: NgFixLabelPosition = NgGlobal.config.fixLabelPos;
  readonly: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  inputCount: number = 4;
  numbersOnly: boolean = true;
}

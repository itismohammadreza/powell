import {Component, Inject} from '@angular/core';
import {NgFixLabelPosition} from "@ng/models/forms";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgConfig} from "@ng/models/config";

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
  rtl: boolean = this.ngConfig.rtl;
  labelPos: NgFixLabelPosition = this.ngConfig.fixLabelPos;
  readonly: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  inputCount: number = 4;
  numbersOnly: boolean = true;
}

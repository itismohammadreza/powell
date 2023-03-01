import {Component, Inject} from '@angular/core';
import {NgFixLabelPosition} from "@ng/models/forms";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ConfigService} from "@ng/services";
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
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean;
  readonly: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  inputCount: number = 4;
  numbersOnly: boolean = true;

  constructor(private configService: ConfigService) {
  }
}

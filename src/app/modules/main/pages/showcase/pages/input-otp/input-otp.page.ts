import {Component, inject} from '@angular/core';
import {NgFixLabelPosition, NgInputVariant, NgSize} from "@powell/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-otp-page',
  templateUrl: './input-otp.page.html',
  styleUrls: ['./input-otp.page.scss']
})
export class InputOtpPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.getConfig().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  followConfig: boolean = this.configService.getConfig().followConfig;
  readonly: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  inputCount: number = 4;
  numbersOnly: boolean = true;
}

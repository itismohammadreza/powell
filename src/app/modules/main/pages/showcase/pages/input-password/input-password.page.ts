import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-password-page',
  templateUrl: './input-password.page.html',
  styleUrls: ['./input-password.page.scss'],
})
export class InputPasswordPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.get().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.get().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.get().inputSize;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  promptLabel: string = 'لطفا رمز عبور را وارد کنید';
  weakLabel: string = 'ضعیف';
  mediumLabel: string = 'متوسط';
  strongLabel: string = 'قوی';
  feedback: boolean = true;
  toggleMask: boolean = false;
  disabled: boolean = false;
  placeholder: string = '';
  showClear: boolean = true;
}

import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NgAddon,
  NgCurrency,
  NgCurrencyDisplay,
  NgIconPosition,
  NgInputVariant,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode,
  NgSize
} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-number-page',
  templateUrl: './input-number.page.html',
  styleUrls: ['./input-number.page.scss']
})
export class InputNumberPage {
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
  format: boolean = true;
  showButtons: boolean = true;
  buttonLayout: NgNumberButtonLayout = 'stacked';
  mode: NgNumberMode = 'decimal';
  prefix: string = '';
  suffix: string = '';
  currency: NgCurrency;
  currencyDisplay: NgCurrencyDisplay = 'symbol';
  useGrouping: boolean = true;
  min: number = 0;
  max: number = 100;
  step: number = 1;
  allowEmpty: boolean = true;
  placeholder: string = '';
  size: number = 100;
  maxlength: number;
  disabled: boolean = false;
  readonly: boolean = false;
  showClear: boolean = true;
}

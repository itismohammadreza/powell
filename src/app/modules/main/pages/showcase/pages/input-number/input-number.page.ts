import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NgAddon,
  NgCurrency,
  NgCurrencyDisplay,
  NgIconPosition,
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
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
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

  constructor(private configService: ConfigService) {
  }
}

import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {
  NgAddon,
  NgCurrency,
  NgCurrencyDisplay,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode
} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-input-number-page',
  templateUrl: './input-number.page.html',
  styleUrls: ['./input-number.page.scss'],
})
export class InputNumberPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = NgGlobal.config.filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = NgGlobal.config.labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize  = NgGlobal.config.inputSize;
  addon: NgAddon;
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

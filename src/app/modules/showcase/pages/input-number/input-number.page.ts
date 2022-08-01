import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {
  NgAddon,
  NgCurrency,
  NgCurrencyDisplay,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode
} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-input-number-page',
  templateUrl: './input-number.page.html',
  styleUrls: ['./input-number.page.scss'],
})
export class InputNumberPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  filled: boolean = false;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  icon: string;
  inputSize: NgSize = 'md';
  format: boolean = true;
  showButtons: boolean = true;
  buttonLayout: NgNumberButtonLayout = 'stacked';
  incrementButtonIcon: string = 'pi pi-chevron-up';
  decrementButtonIcon: string = 'pi pi-chevron-down';
  mode: NgNumberMode = 'decimal';
  prefix: string;
  suffix: string;
  currency: NgCurrency;
  currencyDisplay: NgCurrencyDisplay = 'symbol';
  useGrouping: boolean = true;
  minFractionDigits: number;
  maxFractionDigits: number;
  min: number;
  max: number;
  step: number = 1;
  placeholder: string;
  size: number;
  maxlength: number;
  disabled: boolean = false;
  title: string;
  addon: NgAddon;
}

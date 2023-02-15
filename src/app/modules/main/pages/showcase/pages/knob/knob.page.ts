import {Component, Inject} from '@angular/core';
import {FormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-knob-page',
  templateUrl: './knob.page.html',
  styleUrls: ['./knob.page.scss'],
})
export class KnobPage {
  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }

  form = new FormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  labelPos: NgFixLabelPosition = 'fix-side';
  // native properties
  size: number = 100;
  disabled: boolean = false;
  readonly: boolean = false;
  step: number = 1;
  min: number = 0;
  max: number = 100;
  valueColor: string = "var(--primary-color, Black)";
  rangeColor: string = "var(--surface-border, LightGray)";
  textColor: string = "var(--text-color-secondary, Black)";
  strokeWidth: number = 14;
  showValue: boolean = true;
  valueTemplate: string = '{value}';
}

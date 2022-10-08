import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-knob-page',
  templateUrl: './knob.page.html',
  styleUrls: ['./knob.page.scss'],
})
export class KnobPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
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

import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-knob-page',
  templateUrl: './knob.page.html',
  styleUrls: ['./knob.page.scss'],
})
export class KnobPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  size: number = 100;
  disabled: boolean = false;
  readonly: boolean = false;
  step: number;
  min: number = 0;
  max: number = 100;
  valueColor: string;
  rangeColor: number;
  textColor: number;
  strokeWidth: number = 14;
  showValue: boolean = true;
  valueTemplate: string = '{value}';
  style: object;
  styleClass: string;
}

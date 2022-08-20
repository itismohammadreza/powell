import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';

@Component({
  selector: 'ng-radio-page',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  // native properties
  orientation: NgOrientation = 'vertical';
  disabled: boolean = false;
  readonly: boolean = false;

  options: any[];

  submit() {
  }
}

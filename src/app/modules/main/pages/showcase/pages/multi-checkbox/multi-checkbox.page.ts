import {Component} from '@angular/core';
import {UntypedFormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-multi-checkbox-page',
  templateUrl: './multi-checkbox.page.html',
  styleUrls: ['./multi-checkbox.page.scss'],
})
export class MultiCheckboxPage {
  form = new FormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
  labelPos: NgFixLabelPosition = 'fix-side';
  // native properties
  orientation: NgOrientation = 'vertical';
  disabled: boolean = false;
  readonly: boolean = false;

  options: any[] = [
    {label: 'Australia', value: 'AU'},
    {label: 'Brazil', value: 'BR'},
    {label: 'China', value: 'CN'},
    {label: 'Egypt', value: 'EG'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'India', value: 'IN'},
    {label: 'Japan', value: 'JP'},
    {label: 'Spain', value: 'ES'},
    {label: 'United States', value: 'US'}
  ];
}

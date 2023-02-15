import {Component, Inject} from '@angular/core';
import {FormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-radio-page',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage {
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
  orientation: NgOrientation = 'vertical';
  disabled: boolean = false;

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

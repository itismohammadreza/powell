import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition, NgInputVariant, NgOrientation} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-radio-page',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.getConfig().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  followConfig: boolean = this.configService.getConfig().followConfig;
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

import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-knob-page',
  templateUrl: './knob.page.html',
  styleUrls: ['./knob.page.scss'],
})
export class KnobPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
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

  constructor(private configService: ConfigService) {
  }
}

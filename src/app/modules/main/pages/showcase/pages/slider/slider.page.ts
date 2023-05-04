import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition, NgOrientation} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-slider-page',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage {
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
  animate: boolean = true;
  disabled: boolean = false;
  min: number = 0;
  max: number = 100;
  orientation: NgOrientation = 'horizontal';
  step: number = 1;
  range: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

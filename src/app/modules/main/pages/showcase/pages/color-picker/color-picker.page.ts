import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgColorFormat, NgIconPosition, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-color-picker-page',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss']
})
export class ColorPickerPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = this.configService.getConfig().inputSize;
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  maxlength: number = 7;
  inline: boolean = false;
  format: NgColorFormat = 'hex';

  constructor(private configService: ConfigService) {
  }
}

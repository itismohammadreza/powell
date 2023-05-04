import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-mask-page',
  templateUrl: './input-mask.page.html',
  styleUrls: ['./input-mask.page.scss'],
})
export class InputMaskPage {
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
  addon: NgAddon;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  mask: string = '99-999999';
  slotChar: string = '_';
  autoClear: boolean = true;
  unmask: boolean = false;
  placeholder: string = '';
  size: number = 100;
  maxlength: number = 100;
  disabled: boolean = false;
  readonly: boolean = false;
  characterPattern: string = '[A-Za-z]';
  showClear: boolean = true;

  constructor(private configService: ConfigService) {
  }
}

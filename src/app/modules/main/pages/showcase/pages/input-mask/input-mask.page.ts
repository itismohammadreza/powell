import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-mask-page',
  templateUrl: './input-mask.page.html',
  styleUrls: ['./input-mask.page.scss'],
})
export class InputMaskPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.get().inputStyle;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.get().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.get().inputSize;
  followConfig: boolean = this.configService.get().followConfig;
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
}

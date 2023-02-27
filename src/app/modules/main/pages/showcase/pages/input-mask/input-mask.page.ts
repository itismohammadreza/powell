import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {ConfigService} from "@ng/services";

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
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = this.configService.getConfig().inputSize;
  addon: NgAddon;
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

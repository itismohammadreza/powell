import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgColorFormat, NgLabelPosition} from '@ng/models/forms';
import {ConfigService} from "@ng/services";

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
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = this.configService.getConfig().inputSize;
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  // native properties
  maxlength: number = 7;
  inline: boolean = false;
  format: NgColorFormat = 'hex';

  constructor(private configService: ConfigService) {
  }
}

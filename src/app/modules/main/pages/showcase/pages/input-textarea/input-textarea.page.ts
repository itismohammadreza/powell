import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-textarea-page',
  templateUrl: './input-textarea.page.html',
  styleUrls: ['./input-textarea.page.scss'],
})
export class InputTextareaPage {
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
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  rows: number = 7;
  cols: number = 100;
  autoResize: boolean = false;
}

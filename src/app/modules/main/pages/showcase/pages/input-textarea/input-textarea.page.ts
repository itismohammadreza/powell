import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-input-textarea-page',
  templateUrl: './input-textarea.page.html',
  styleUrls: ['./input-textarea.page.scss'],
})
export class InputTextareaPage {
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
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  rows: number = 7;
  cols: number = 100;
  autoResize: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

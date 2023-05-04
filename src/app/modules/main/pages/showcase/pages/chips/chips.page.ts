import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgIconPosition, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-chips-page',
  templateUrl: './chips.page.html',
  styleUrls: ['./chips.page.scss'],
})
export class ChipsPage {
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
  max: number = 0;
  disabled: boolean = false;
  placeholder: string = '';
  allowDuplicate: boolean = true;
  addOnTab: boolean = false;
  addOnBlur: boolean = false;
  showClear: boolean = true;

  constructor(private configService: ConfigService) {
  }
}

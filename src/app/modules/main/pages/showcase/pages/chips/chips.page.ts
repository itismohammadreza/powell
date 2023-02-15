import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-chips-page',
  templateUrl: './chips.page.html',
  styleUrls: ['./chips.page.scss'],
})
export class ChipsPage {
  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = this.ngConfig.defaultLabelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  max: number = 0;
  disabled: boolean = false;
  placeholder: string = '';
  allowDuplicate: boolean = true;
  addOnTab: boolean = false;
  addOnBlur: boolean = false;
  showClear: boolean = true;
}

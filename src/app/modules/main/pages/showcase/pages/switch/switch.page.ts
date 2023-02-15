import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgFixLabelPosition} from "@ng/models/forms";
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-switch-page',
  templateUrl: './switch.page.html',
  styleUrls: ['./switch.page.scss'],
})
export class SwitchPage {
  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  labelPos: NgFixLabelPosition = this.ngConfig.defaultFixLabelPos;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  async: boolean = false;

  asyncFlag = false;

  onChangeAsync({loadingCallback, value}) {
    this.asyncFlag = !this.asyncFlag;
    setTimeout(() => {
      loadingCallback(this.asyncFlag)
    }, 3000)
  }
}

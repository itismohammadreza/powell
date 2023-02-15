import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@ng/models/forms";
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-dual-label-switch-page',
  templateUrl: './dual-label-switch.page.html',
  styleUrls: ['./dual-label-switch.page.scss']
})
export class DualLabelSwitchPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  labelPos: NgFixLabelPosition = NgGlobal.config.fixLabelPos;
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

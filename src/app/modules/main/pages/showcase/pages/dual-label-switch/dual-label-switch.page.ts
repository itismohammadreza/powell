import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@ng/models/forms";
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-dual-label-switch-page',
  templateUrl: './dual-label-switch.page.html',
  styleUrls: ['./dual-label-switch.page.scss']
})
export class DualLabelSwitchPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
  labelPos: NgFixLabelPosition = 'fix-side';
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

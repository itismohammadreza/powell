import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@powell/models";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-dual-label-switch-page',
  templateUrl: './dual-label-switch.page.html',
  styleUrls: ['./dual-label-switch.page.scss']
})
export class DualLabelSwitchPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.get().fixLabelPos;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  async: boolean = false;
  followConfig: boolean = this.configService.get().followConfig;

  asyncFlag = false;

  onChangeAsync({loadingCallback}) {
    this.asyncFlag = !this.asyncFlag;
    setTimeout(() => {
      loadingCallback(this.asyncFlag)
    }, 3000)
  }
}

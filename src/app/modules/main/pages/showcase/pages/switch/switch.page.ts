import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgFixLabelPosition} from "@powell/models";
import {ConfigService} from "@powell/api";
import {SwitchModule} from "@powell/components/switch";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-switch-page',
  templateUrl: './switch.page.html',
  styleUrls: ['./switch.page.scss'],
  imports: [
    SwitchModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class SwitchPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.requiredTrue]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.get().fixLabelPos;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  async: boolean = false;

  asyncFlag = false;

  onChangeAsync({loadingCallback}) {
    this.asyncFlag = !this.asyncFlag;
    setTimeout(() => {
      loadingCallback(this.asyncFlag)
    }, 3000)
  }
}

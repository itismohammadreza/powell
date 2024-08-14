import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from "@powell/api";
import {NgInputVariant} from "@powell/models";

@Component({
  selector: 'ng-checkbox-page',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
})
export class CheckboxPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.requiredTrue]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.getConfig().inputStyle;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  followConfig: boolean = this.configService.getConfig().followConfig;
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

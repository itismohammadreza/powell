import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ConfigService} from "@ng/services";

@Component({
  selector: 'ng-checkbox-page',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
})
export class CheckboxPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  async: boolean = false;

  asyncFlag = false;

  constructor(private configService: ConfigService) {
  }

  onChangeAsync({loadingCallback, value}) {
    this.asyncFlag = !this.asyncFlag;
    setTimeout(() => {
      loadingCallback(this.asyncFlag)
    }, 3000)
  }
}

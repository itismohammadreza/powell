import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "@powell/api";
import {NgInputVariant} from "@powell/models";

@Component({
  selector: 'ng-tri-state-checkbox-page',
  templateUrl: './tri-state-checkbox.page.html',
  styleUrls: ['./tri-state-checkbox.page.scss']
})
export class TriStateCheckboxPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  variant: NgInputVariant = this.configService.get().inputStyle;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
}

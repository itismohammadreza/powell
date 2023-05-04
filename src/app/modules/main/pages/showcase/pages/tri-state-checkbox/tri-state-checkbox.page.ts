import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-tri-state-checkbox-page',
  templateUrl: './tri-state-checkbox.page.html',
  styleUrls: ['./tri-state-checkbox.page.scss']
})
export class TriStateCheckboxPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

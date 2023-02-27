import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ConfigService} from "@ng/services";

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
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;

  constructor(private configService: ConfigService) {
  }
}

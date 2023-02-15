import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgConfig} from "@ng/models/config";

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
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
}

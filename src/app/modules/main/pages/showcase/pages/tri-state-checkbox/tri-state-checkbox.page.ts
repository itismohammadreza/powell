import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ng-tri-state-checkbox-page',
  templateUrl: './tri-state-checkbox.page.html',
  styleUrls: ['./tri-state-checkbox.page.scss']
})
export class TriStateCheckboxPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  hint: string = '';
  rtl: boolean = true;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
}

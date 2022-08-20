import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-select-button-page',
  templateUrl: './select-button.page.html',
  styleUrls: ['./select-button.page.scss'],
})
export class SelectButtonPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  // native properties
  multiple: boolean = false;
  disabled: boolean = false;

  options: any[];

  submit() {
  }
}

import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-dual-label-switch-page',
  templateUrl: './dual-label-switch.page.html',
  styleUrls: ['./dual-label-switch.page.scss']
})
export class DualLabelSwitchPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgFixLabelPosition = 'fix-side';
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
}

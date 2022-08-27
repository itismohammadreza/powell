import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-chips-page',
  templateUrl: './chips.page.html',
  styleUrls: ['./chips.page.scss'],
})
export class ChipsPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  icon: string = '';
  labelPos: NgLabelPosition = 'fix-side';
  iconPos: NgPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  max: number = 0;
  disabled: boolean = false;
  placeholder: string = '';
  allowDuplicate: boolean = true;
  addOnTab: boolean = false;
  addOnBlur: boolean = false;
  showClear: boolean = true;
}

import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgInputTypes, NgKeyFilter, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-input-text-page',
  templateUrl: './input-text.page.html',
  styleUrls: ['./input-text.page.scss'],
})
export class InputTextPage {
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
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  type: NgInputTypes = 'text';
  keyFilter: NgKeyFilter = 'alphanum';
}

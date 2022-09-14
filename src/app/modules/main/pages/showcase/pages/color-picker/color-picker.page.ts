import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgAddon, NgColorFormat, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-color-picker-page',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss']
})
export class ColorPickerPage {
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
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  // native properties
  maxlength: number = 7;
  inline: boolean = false;
  format: NgColorFormat = 'hex';
}

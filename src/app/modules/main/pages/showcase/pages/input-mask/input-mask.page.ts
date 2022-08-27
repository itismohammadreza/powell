import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgInputTypes, NgKeyFilter, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-input-mask-page',
  templateUrl: './input-mask.page.html',
  styleUrls: ['./input-mask.page.scss'],
})
export class InputMaskPage {
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
  mask: string = '99-999999';
  slotChar: string = '_';
  autoClear: boolean = true;
  unmask: boolean = false;
  placeholder: string = '';
  size: number = 100;
  maxlength: number = 100;
  disabled: boolean = false;
  readonly: boolean = false;
  characterPattern: string = '[A-Za-z]';
  showClear: boolean = true;
}

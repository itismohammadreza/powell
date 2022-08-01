import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgPosition, NgSize} from '@ng/models/offset';
import {NgAddon, NgColorFormat, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-color-picker-page',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss']
})
export class ColorPickerPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  submit() {
  }

  ngOnInit(): void {
  }

  label: string;
  filled: boolean = false;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  icon: string;
  inputSize: NgSize;
  readonly: boolean = false;
  maxlength: number = 7;
  placeholder: string;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  inline: boolean = false;
  format: NgColorFormat = 'hex';
  appendTo: any;
  disabled: boolean = false;
  addon: NgAddon;
}

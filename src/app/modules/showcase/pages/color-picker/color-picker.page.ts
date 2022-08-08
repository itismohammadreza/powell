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

  hint: string = '';
  label: string = 'label';
  labelPos: NgLabelPosition = 'fix-side';
  labelWidth: number = 100;
  icon: string = 'pi pi-home';
  iconPos: NgPosition = 'left';
  inputSize: NgSize = 'md';
  filled: boolean = false;
  showRequiredStar: boolean = true;
  rtl: boolean = true;
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  addon: NgAddon = {
    // before: {
    //   type: 'icon',
    //   icon: 'pi pi-home',
    // },
    after: {
      type: 'button',
      label: 'home',
    },
  };

  maxlength: number = 7;
  inline: boolean = false;
  format: NgColorFormat = 'hex';

  submit() {
  }

  ngOnInit(): void {
  }
}

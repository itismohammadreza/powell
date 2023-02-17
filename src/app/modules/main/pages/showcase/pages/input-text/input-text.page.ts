import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgInputType, NgKeyFilter, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-input-text-page',
  templateUrl: './input-text.page.html',
  styleUrls: ['./input-text.page.scss'],
})
export class InputTextPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.email, this.akbarValidator]),
  });
  binding;

  label: string = 'label';
  filled: boolean = NgGlobal.config.filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = NgGlobal.config.labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  type: NgInputType = 'text';
  keyFilter: NgKeyFilter | RegExp = /.*/g;
  showClear: boolean = true;

  akbarValidator(control: FormControl) {
    return control.value == 'akbar' ? {akbarDenied: true} : null
  }

  getLengthMessage() {
    return `${this.form.get('c1').value} is not valid length`;
  }
}

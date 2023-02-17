import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition} from '@ng/models/offset';
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-input-textarea-page',
  templateUrl: './input-textarea.page.html',
  styleUrls: ['./input-textarea.page.scss'],
})
export class InputTextareaPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
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
  addon: NgAddon;
  // native properties
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  rows: number = 7;
  cols: number = 100;
  autoResize: boolean = false;
}

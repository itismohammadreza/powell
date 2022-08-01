import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgPosition} from '@ng/models/offset';

@Component({
  selector: 'ng-input-textarea-page',
  templateUrl: './input-textarea.page.html',
  styleUrls: ['./input-textarea.page.scss'],
})
export class InputTextareaPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  icon: string;
  rows: number;
  cols: number;
  autoResize: boolean = false;
  readonly: boolean = false;
  disabled: boolean = false;
  filled: boolean = false;
  showRequiredStar: boolean = true;
  maxlength: number;
  labelWidth: number;
  placeholder: string;
  hint: string;
  rtl: boolean = false;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  addon: NgAddon;
}

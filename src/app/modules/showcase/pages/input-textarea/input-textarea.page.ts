import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgInputTypes, NgKeyFilter, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

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


  label: string = 'test';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  iconPos: NgPosition = 'left';
  icon: string = 'pi pi-home';
  inputSize: NgSize = 'md';
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 2000;
  placeholder: string = '';
  type: NgInputTypes = 'text';
  keyFilter: NgKeyFilter | RegExp = 'alphanum';
  addon: NgAddon = {
    before: {
      type: 'icon',
      icon: 'pi pi-home',
    },
    after: {
      type: 'button',
      icon: 'pi pi-home',
      label: 'test'
    }
  };
  rows: number;
  cols: number;
  autoResize: boolean = false;

}

import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgLabelPosition} from '@ng/models/forms';
import {NgOrientation} from '@ng/models/offset';

@Component({
  selector: 'ng-multi-checkbox-page',
  templateUrl: './multi-checkbox.page.html',
  styleUrls: ['./multi-checkbox.page.scss'],
})
export class MultiCheckboxPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}
  options: any[];
  optionLabel: string = 'label';
  optionValue: string = 'value';
  optionDisabled: string = 'disabled';
  label: string;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  orientation: NgOrientation = 'vertical';
  disabled: boolean = false;
  tabindex: number;
  ariaLabelledBy: string;
  ariaLabel: string;
  style: any;
  styleClass: string;
  labelStyleClass: string;
  checkboxIcon: string = 'pi pi-check';
  readonly: boolean = false;
  required: boolean = false;
  trueValue: any;
  falseValue: any;
}

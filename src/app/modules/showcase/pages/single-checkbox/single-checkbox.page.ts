import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ng-single-checkbox-page',
  templateUrl: './single-checkbox.page.html',
  styleUrls: ['./single-checkbox.page.scss'],
})
export class SingleCheckboxPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  disabled: boolean = false;
  tabindex: number;
  ariaLabelledBy: string;
  ariaLabel: string;
  style: object;
  styleClass: string;
  labelStyleClass: string;
  checkboxIcon: string = 'pi pi-check';
  readonly: boolean = false;
  required: boolean = false;
  trueValue: any;
  falseValue: any;
}

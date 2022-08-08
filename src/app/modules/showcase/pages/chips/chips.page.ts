import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-chips-page',
  templateUrl: './chips.page.html',
  styleUrls: ['./chips.page.scss'],
})
export class ChipsPage implements OnInit {
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
  addon: NgAddon// = {
    // before: {
    //   type: 'icon',
    //   icon: 'pi pi-home',
    // },
    // after: {
    //   type: 'button',
    //   label: 'home',
    // },
 // };

  allowDuplicate: boolean = false;
  max: number;
  addOnTab: boolean = false;
  addOnBlur: boolean = false;

  submit() {
  }

  ngOnInit(): void {
  }
}

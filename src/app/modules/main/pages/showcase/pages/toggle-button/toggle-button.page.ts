import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgFixLabelPosition} from "@ng/models/forms";
import {NgIconPosition} from "@ng/models/offset";
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-toggle-button-page',
  templateUrl: './toggle-button.page.html',
  styleUrls: ['./toggle-button.page.scss'],
})
export class ToggleButtonPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
  labelPos: NgFixLabelPosition = 'fix-side';
  // native properties
  onLabel: string = '';
  offLabel: string = '';
  onIcon: string = 'pi pi-check';
  offIcon: string = 'pi pi-times';
  iconPos: NgIconPosition = 'left';
  disabled: boolean = false;
}

import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NgAddon, NgFixLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgFixLabelPosition = 'fix-side';
  addon: NgAddon;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = false;
}

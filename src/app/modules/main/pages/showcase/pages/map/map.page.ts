import {Component, Inject} from '@angular/core';
import {FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {NgAddon, NgFixLabelPosition} from "@ng/models/forms";
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  constructor(@Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }

  form = new FormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  labelPos: NgFixLabelPosition = 'fix-side';
  addon: NgAddon;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = false;
}

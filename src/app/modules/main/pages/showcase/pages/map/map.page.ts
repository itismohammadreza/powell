import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgAddon, NgFixLabelPosition} from "@ng/models/forms";
import {NgGlobal} from "@ng/ng-global";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = NgGlobal.config.rtl;
  labelPos: NgFixLabelPosition = NgGlobal.config.fixLabelPos;
  addon: NgAddon;
  // native properties
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = false;
}

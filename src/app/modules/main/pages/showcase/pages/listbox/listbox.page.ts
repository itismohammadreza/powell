import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgAddon, NgFixLabelPosition} from '@ng/models/forms';
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-listbox-page',
  templateUrl: './listbox.page.html',
  styleUrls: ['./listbox.page.scss'],
})
export class ListboxPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  labelPos: NgFixLabelPosition = this.ngConfig.fixLabelPos;
  addon: NgAddon;
  // native properties
  checkbox: boolean = false;
  disabled: boolean = false;
  filter: boolean = false;
  filterPlaceHolder: string = '';
  emptyFilterMessage: string = 'موردی وجود ندارد';
  multiple: boolean = false;
  readonly: boolean = false;
  emptyMessage: string = 'موردی وجود ندارد';
  showToggleAll: boolean = true;

  options: any[] = [
    {label: 'Australia', value: 'AU'},
    {label: 'Brazil', value: 'BR'},
    {label: 'China', value: 'CN'},
    {label: 'Egypt', value: 'EG'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'India', value: 'IN'},
    {label: 'Japan', value: 'JP'},
    {label: 'Spain', value: 'ES'},
    {label: 'United States', value: 'US'}
  ];
}

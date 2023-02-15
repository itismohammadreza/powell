import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgAddon, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {NgConfig} from "@ng/models/config";

@Component({
  selector: 'ng-dropdown-page',
  templateUrl: './dropdown.page.html',
  styleUrls: ['./dropdown.page.scss'],
})
export class DropdownPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.ngConfig.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = this.ngConfig.labelPos;
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  filter: boolean = false;
  disabled: boolean = false;
  readonly: boolean = false;
  emptyMessage: string = 'موردی وجود ندارد';
  emptyFilterMessage: string = 'موردی وجود ندارد';
  editable: boolean = false;
  maxlength: number = 100;
  placeholder: string = '';
  autofocusFilter: boolean = false;
  resetFilterOnHide: boolean = false;
  autoDisplayFirst: boolean = true;
  showClear: boolean = true;

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

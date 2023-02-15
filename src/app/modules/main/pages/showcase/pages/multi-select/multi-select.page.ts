import {Component} from '@angular/core';
import {UntypedFormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgChipDisplayMode, NgFixLabelPosition, NgLabelPosition} from '@ng/models/forms';
import {NgIconPosition, NgSize} from '@ng/models/offset';
import {GlobalConfig} from "@core/global.config";

@Component({
  selector: 'ng-multi-select-page',
  templateUrl: './multi-select.page.html',
  styleUrls: ['./multi-select.page.scss'],
})
export class MultiSelectPage {
  form = new FormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = false;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = GlobalConfig.rtl;
  icon: string = '';
  labelPos: NgLabelPosition = 'fix-side';
  iconPos: NgIconPosition = 'left';
  inputSize: NgSize = 'md';
  addon: NgAddon;
  // native properties
  autofocusFilter: boolean = false;
  defaultLabel: string = 'Choose';
  disabled: boolean = false;
  displaySelectedLabel: boolean = true;
  emptyFilterMessage: string = 'موردی وجود ندارد';
  filter: boolean = true;
  filterPlaceHolder: string = '';
  maxSelectedLabels: number = 3;
  overlayVisible: boolean = false;
  placeholder: string = '';
  readonly: boolean = false;
  emptyMessage: string = 'موردی وجود ندارد';
  resetFilterOnHide: boolean = false;
  scrollHeight: string = '200px';
  selectedItemsLabel: string | 'ellipsis' = 'ellipsis';
  selectionLimit: number = 0;
  showHeader: boolean = true;
  showToggleAll: boolean = true;
  showClear: boolean = true;
  display: NgChipDisplayMode = 'comma';

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

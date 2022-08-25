import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgFilterMatchMode, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-list-box-page',
  templateUrl: './list-box.page.html',
  styleUrls: ['./list-box.page.scss'],
})
export class ListBoxPage {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = true;
  labelPos: NgLabelPosition = 'fix-side';
  addon: NgAddon// = {
  //   before: {
  //     type: 'icon',
  //     icon: 'pi pi-home',
  //   },
  //   after: {
  //     type: 'button',
  //     label: 'home',
  //   },
  // };
  // native properties
  checkbox: boolean = false;
  disabled: boolean = false;
  filter: boolean = false;
  filterPlaceHolder: string = '';
  emptyFilterMessage: string = 'No results found';
  multiple: boolean = false;
  readonly: boolean = false;
  emptyMessage: string = 'No records found';
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

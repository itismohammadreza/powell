import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgFixLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-listbox-page',
  templateUrl: './listbox.page.html',
  styleUrls: ['./listbox.page.scss'],
})
export class ListboxPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.get().fixLabelPos;
  addon: NgAddon;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  checkbox: boolean = false;
  disabled: boolean = false;
  filter: boolean = false;
  filterPlaceHolder: string = '';
  emptyFilterMessage: string = '';
  multiple: boolean = false;
  readonly: boolean = false;
  emptyMessage: string = '';
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

import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgAddon, NgChipDisplayMode, NgIconPosition, NgLabelPosition, NgSize} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-multi-select-page',
  templateUrl: './multi-select.page.html',
  styleUrls: ['./multi-select.page.scss'],
})
export class MultiSelectPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  filled: boolean = this.configService.getConfig().filled;
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.configService.getConfig().labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  inputSize: NgSize = this.configService.getConfig().inputSize;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  // native properties
  autofocusFilter: boolean = false;
  defaultLabel: string = '';
  disabled: boolean = false;
  displaySelectedLabel: boolean = true;
  emptyFilterMessage: string = '';
  filter: boolean = true;
  filterPlaceHolder: string = '';
  maxSelectedLabels: number = 3;
  overlayVisible: boolean = false;
  placeholder: string = '';
  readonly: boolean = false;
  emptyMessage: string = '';
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

  constructor(private configService: ConfigService) {
  }
}

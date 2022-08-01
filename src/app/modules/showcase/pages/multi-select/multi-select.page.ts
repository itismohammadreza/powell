import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgFilterMatchMode, NgLabelPosition} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-multi-select-page',
  templateUrl: './multi-select.page.html',
  styleUrls: ['./multi-select.page.scss'],
})
export class MultiSelectPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;
  submit() {}
  ngOnInit(): void {}

  label: string;
  filled: boolean = false;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  display: string;
  icon: string;
  inputSize: NgSize = 'md';
  appendTo: any;
  ariaFilterLabel: string;
  ariaLabelledBy: string;
  autofocusFilter: boolean = false;
  autoZIndex: boolean = true;
  baseZIndex: number = 1000;
  defaultLabel: string = 'Choose';
  dataKey: string;
  disabled: boolean = false;
  displaySelectedLabel: boolean = true;
  dropdownIcon: string = 'pi pi-chevron-down';
  emptyFilterMessage: string = 'No results found';
  filter: boolean = true;
  filterMatchMode: NgFilterMatchMode = 'contains';
  filterValue: string;
  filterLocale: string = undefined;
  filterBy: string;
  filterPlaceHolder: string;
  hideTransitionOptions: string = '.1s linear';
  itemSize: number;
  maxSelectedLabels: number = 3;
  options: any[];
  optionLabel: string = 'label';
  optionValue: string = 'value';
  optionDisabled: string = 'disabled';
  optionGroupLabel: string = 'label';
  optionGroupChildren: string = 'items';
  group: boolean = false;
  overlayVisible: boolean = false;
  panelStyle: object;
  placeholder: string;
  readonly: boolean = false;
  emptyMessage: string = 'No records found.';
  resetFilterOnHide: boolean = false;
  scrollHeight: string = '200px';
  selectedItemsLabel: string | 'ellipsis' = 'ellipsis';
  selectionLimit: number;
  showHeader: boolean = true;
  showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  showToggleAll: boolean = true;
  style: object;
  styleClass: string;
  tabindex: number;
  tooltip: any;
  tooltipStyleClass: string;
  tooltipPosition: NgPosition = 'top';
  tooltipPositionStyle: string = 'absolute';
  virtualScroll: boolean = false;
  addon: NgAddon;
}

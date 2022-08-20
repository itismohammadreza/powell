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




  hint: string = '';
  label: string = 'label';
  labelPos: NgLabelPosition = 'fix-side';
  labelWidth: number = 100;
  icon: string = 'pi pi-home';
  iconPos: NgPosition = 'left';
  inputSize: NgSize = 'md';
  filled: boolean = false;
  showRequiredStar: boolean = true;
  rtl: boolean = true;
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  addon: NgAddon = {
    before: {
      type: 'icon',
      icon: 'pi pi-home',
    },
    after: {
      type: 'button',
      label: 'home',
    },
  };
  scrollHeight: string = '200px';
  options: any[];
  filter: boolean = false;
  filterPlaceholder: string;
  editable: boolean = false;
  maxlength: number;
  autofocusFilter: boolean = false;
  resetFilterOnHide: boolean = false;
  emptyFilterMessage: string = 'nothing found.';
  autoDisplayFirst: boolean = false;
  showClear: boolean = false;
  tooltip: any;
  tooltipPosition: NgPosition = 'top';
  display: string = 'comma';
  appendTo: any;
  ariaFilterLabel: string;
  ariaLabelledBy: string;
  autoZIndex: boolean = true;
  baseZIndex: number = 1000;
  defaultLabel: string = 'Choose';
  dataKey: string;
  displaySelectedLabel: boolean = true;
  dropdownIcon: string = 'pi pi-chevron-down';
  filterMatchMode: NgFilterMatchMode = 'contains';
  filterValue: string;
  filterLocale: string = undefined;
  filterBy: string;
  filterPlaceHolder: string;
  hideTransitionOptions: string = '.1s linear';
  itemSize: number;
  maxSelectedLabels: number = 3;
  optionLabel: string = 'label';
  optionValue: string = 'value';
  optionDisabled: string = 'disabled';
  optionGroupLabel: string = 'label';
  optionGroupChildren: string = 'items';
  group: boolean = false;
  overlayVisible: boolean = false;
  panelStyle: any;
  emptyMessage: string = 'No records found.';
  selectedItemsLabel: string | 'ellipsis' = 'ellipsis';
  selectionLimit: number;
  showHeader: boolean = true;
  showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  showToggleAll: boolean = true;
  style: any;
  styleClass: string;
  tabindex: number;
  tooltipStyleClass: string;
  tooltipPositionStyle: string = 'absolute';
  virtualScroll: boolean = false;
}

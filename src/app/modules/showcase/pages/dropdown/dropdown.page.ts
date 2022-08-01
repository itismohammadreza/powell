import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {NgLabelPosition, NgFilterMatchMode, NgAddon} from '@ng/models/forms';
import {NgPosition, NgSize} from '@ng/models/offset';
import {LanguageChecker} from '@core/utils';

@Component({
  selector: 'ng-dropdown-page',
  templateUrl: './dropdown.page.html',
  styleUrls: ['./dropdown.page.scss'],
})
export class DropdownPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  submit() {
  }

  ngOnInit(): void {
  }

  label: string;
  filled: boolean = false;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  iconPos: NgPosition = 'left';
  scrollHeight: string = '200px';
  options: any[];
  optionLabel: string = 'label';
  optionValue: string = 'value';
  optionDisabled: string = 'disabled';
  optionGroupLabel: string = 'label';
  optionGroupChildren: string = 'items';
  filter: boolean = false;
  filterValue: string;
  filterBy: string;
  filterMatchMode: NgFilterMatchMode = 'contains';
  filterPlaceholder: string;
  disabled: boolean = false;
  readonly: boolean = false;
  editable: boolean = false;
  maxlength: number;
  appendTo: any;
  placeholder: string;
  icon: string;
  inputSize: NgSize = 'md';
  dataKey: string;
  autofocus: boolean = false;
  autofocusFilter: boolean = false;
  resetFilterOnHide: boolean = false;
  emptyFilterMessage: string;
  autoDisplayFirst: boolean = false;
  group: boolean = false;
  showClear: boolean = false;
  tooltip: any;
  tooltipPosition: NgPosition = 'top';
  addon: NgAddon = {
    before: {
      type: 'icon',
      icon: 'pi pi-home',
    },
  };
}

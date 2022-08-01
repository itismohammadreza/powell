import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgAddon, NgFilterMatchMode, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-list-box-page',
  templateUrl: './list-box.page.html',
  styleUrls: ['./list-box.page.scss'],
})
export class ListBoxPage implements OnInit {
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
  ariaFilterLabel: string;
  checkbox: boolean = false;
  dataKey: string;
  disabled: boolean = false;
  filter: boolean = false;
  filterMatchMode: NgFilterMatchMode = 'contains';
  filterValue: string;
  filterLocale: string = undefined;
  filterPlaceHolder: string;
  emptyFilterMessage: string = 'No results found';
  listStyle: string;
  listStyleClass: string;
  metaKeySelection: boolean = true;
  multiple: boolean = false;
  readonly: boolean = false;
  emptyMessage: string = 'No records found';
  options: any[];
  optionLabel: string = 'label';
  optionValue: string = 'value';
  optionDisabled: string = 'disabled';
  optionGroupLabel: string = 'label';
  optionGroupChildren: string = 'items';
  group: boolean = false;
  showToggleAll: boolean = true;
  style: string;
  styleClass: string;
  addon: NgAddon;
}

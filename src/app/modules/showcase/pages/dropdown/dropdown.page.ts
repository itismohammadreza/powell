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

  submit() {
  }

  ngOnInit(): void {
  }
}

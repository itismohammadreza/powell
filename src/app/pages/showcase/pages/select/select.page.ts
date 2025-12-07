import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectComponent, SelectModule} from "@powell/components/select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";

@Component({
  selector: 'app-select-page',
  templateUrl: './select.page.html',
  imports: [
    SelectModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class SelectPage extends PreviewBase {
  @ViewChild(SelectComponent) declare cmpRef: SelectComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'async', value: false},
    {field: 'filter', value: false},
    {field: 'readonly', value: false},
    {field: 'editable', value: false},
    {field: 'placeholder', value: ''},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'resetFilterOnHide', value: false},
    {field: 'checkmark', value: false},
    {field: 'dropdownIcon', value: ''},
    {field: 'showClear', value: true},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'maxlength', value: 100},
    {field: 'autofocusFilter', value: false},
    {field: 'fluid', value: false},
    {field: 'disabled', value: false},
  ];
}

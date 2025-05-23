import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectComponent, SelectModule} from "@powell/components/select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-select-page',
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
    {field: 'labelPosition', options: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', options: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'async', value: false},
    {field: 'filter', value: false},
    {field: 'readonly', value: false},
    {field: 'editable', value: false},
    {field: 'placeholder', value: ''},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
    {field: 'resetFilterOnHide', value: false},
    {field: 'checkmark', value: false},
    {field: 'dropdownIcon', value: ''},
    {field: 'showClear', value: true},
    {field: 'size', options: 'sizes', value: this.config.inputSize},
    {field: 'maxlength', value: 100},
    {field: 'autofocusFilter', value: false},
    {field: 'fluid', value: false},
    {field: 'disabled', value: false},
  ];
}

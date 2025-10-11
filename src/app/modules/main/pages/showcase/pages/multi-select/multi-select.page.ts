import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectComponent, MultiSelectModule} from "@powell/components/multi-select";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'multi-select-page',
  templateUrl: './multi-select.page.html',
  imports: [
    MultiSelectModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class MultiSelectPage extends PreviewBase {
  @ViewChild(MultiSelectComponent) declare cmpRef: MultiSelectComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'fluid', value: false},
    {field: 'readonly', value: false},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'displaySelectedLabel', value: true},
    {field: 'maxSelectedLabels', value: 3},
    {field: 'selectionLimit', value: ''},
    {field: 'selectedItemsLabel', value: ''},
    {field: 'showToggleAll', value: true},
    {field: 'resetFilterOnHide', value: false},
    {field: 'showHeader', value: true},
    {field: 'autofocusFilter', value: false},
    {field: 'filter', value: true},
    {field: 'overlayVisible', value: false},
    {field: 'display', selectOptions: 'displayTypes', value: 'comma'},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'showClear', value: true},
    {field: 'placeholder', value: ''},
  ];
}

import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputNumberComponent, InputNumberModule} from "@powell/components/input-number";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'app-input-number-page',
  templateUrl: './input-number.page.html',
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputNumberPage extends PreviewBase {
  @ViewChild(InputNumberComponent) declare cmpRef: InputNumberComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'showButtons', value: true},
    {field: 'format', value: true},
    {field: 'buttonLayout', selectOptions: 'buttonLayouts', value: 'stacked'},
    {field: 'placeholder', value: ''},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'maxlength', value: ''},
    {field: 'min', value: 0},
    {field: 'max', value: 100},
    {field: 'readonly', value: false},
    {field: 'step', value: 1},
    {field: 'allowEmpty', value: true},
    {field: 'useGrouping', value: true},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'prefix', value: ''},
    {field: 'suffix', value: ''},
    {field: 'showClear', value: true},
    {field: 'disabled', value: false},
    {field: 'fluid', value: false},
  ];
}

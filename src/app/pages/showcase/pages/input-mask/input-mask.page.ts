import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputMaskComponent, InputMaskModule} from "@powell/components/input-mask";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";

@Component({
  selector: 'app-input-mask-page',
  templateUrl: './input-mask.page.html',
  imports: [
    InputMaskModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputMaskPage extends PreviewBase {
  @ViewChild(InputMaskComponent) declare cmpRef: InputMaskComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'fluid', value: false},
    {field: 'slotChar', value: '_'},
    {field: 'autoClear', value: true},
    {field: 'showClear', value: true},
    {field: 'placeholder', value: ''},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'maxlength', value: 100},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'unmask', value: false},
    {field: 'mask', value: '99-999999'},
  ];
}

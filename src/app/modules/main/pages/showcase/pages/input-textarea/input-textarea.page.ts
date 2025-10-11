import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextareaComponent, InputTextareaModule} from "@powell/components/input-textarea";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'input-textarea-page',
  templateUrl: './input-textarea.page.html',
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputTextareaPage extends PreviewBase {
  @ViewChild(InputTextareaComponent) declare cmpRef: InputTextareaComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'rows', value: 7},
    {field: 'cols', value: 50},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'maxlength', value: 100},
    {field: 'placeholder', value: ''},
    {field: 'autoResize', value: false},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputVariant},
    {field: 'fluid', value: false},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize}
  ]
}

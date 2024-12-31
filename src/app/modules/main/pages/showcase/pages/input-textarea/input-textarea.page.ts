import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextareaComponent, InputTextareaModule} from "@powell/components/input-textarea";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-textarea-page',
  templateUrl: './input-textarea.page.html',
  styleUrls: ['./input-textarea.page.scss'],
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputTextareaPage extends PreviewBase {
  @ViewChild(InputTextareaComponent, {static: true}) declare cmpRef: InputTextareaComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'icon', value: ''},
    {field: 'labelPos', value: this.config.labelPos},
    {field: 'iconPos', value: 'left'},
    {field: 'addon', value: ''},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'rows', value: 7},
    {field: 'cols', value: 100},
    {field: 'readonly', value: false},
    {field: 'disabled', value: false},
    {field: 'maxlength', value: 100},
    {field: 'placeholder', value: ''},
    {field: 'autoResize', value: false},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'fluid', value: false},
    {field: 'size', value: ''}
  ]
}

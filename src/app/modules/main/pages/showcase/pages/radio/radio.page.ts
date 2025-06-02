import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RadioComponent, RadioModule} from "@powell/components/radio";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'radio-page',
  templateUrl: './radio.page.html',
  imports: [
    RadioModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class RadioPage extends PreviewBase {
  @ViewChild(RadioComponent) declare cmpRef: RadioComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'orientation', selectOptions: 'orientations', value: 'vertical'},
    {field: 'disabled', value: false},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputStyle},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize}
  ]
}

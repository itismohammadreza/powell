import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RadioComponent, RadioModule} from "@powell/components/radio";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-radio-page',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
  imports: [
    RadioModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class RadioPage extends PreviewBase {
  @ViewChild(RadioComponent, {static: true}) declare cmpRef: RadioComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'orientation', value: 'vertical'},
    {field: 'disabled', value: false},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
    {field: 'size', options: 'sizes', value: this.config.inputSize}
  ]
}

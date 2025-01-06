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
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'orientation', value: 'vertical'},
    {field: 'disabled', value: false},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'size', value: ''}
  ]
}

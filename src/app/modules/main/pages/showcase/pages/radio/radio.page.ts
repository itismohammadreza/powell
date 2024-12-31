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

  options: any[] = [
    {label: 'Australia', value: 'AU'},
    {label: 'Brazil', value: 'BR'},
    {label: 'China', value: 'CN'},
    {label: 'Egypt', value: 'EG'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'India', value: 'IN'},
    {label: 'Japan', value: 'JP'},
    {label: 'Spain', value: 'ES'},
    {label: 'United States', value: 'US'}
  ];
}

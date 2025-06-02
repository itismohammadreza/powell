import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {InputOtpComponent, InputOtpModule} from "@powell/components/input-otp";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'input-otp-page',
  templateUrl: './input-otp.page.html',
  imports: [
    InputOtpModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputOtpPage extends PreviewBase {
  @ViewChild(InputOtpComponent) declare cmpRef: InputOtpComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'variant', selectOptions: 'variants', value: this.config.inputStyle},
    {field: 'length', value: 4},
    {field: 'mask', value: false},
    {field: 'numbersOnly', value: true},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
  ];
}

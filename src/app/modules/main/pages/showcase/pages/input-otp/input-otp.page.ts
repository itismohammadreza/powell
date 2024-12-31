import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {InputOtpComponent, InputOtpModule} from "@powell/components/input-otp";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-otp-page',
  templateUrl: './input-otp.page.html',
  styleUrls: ['./input-otp.page.scss'],
  imports: [
    InputOtpModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputOtpPage extends PreviewBase {
  @ViewChild(InputOtpComponent, {static: true}) declare cmpRef: InputOtpComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'length', value: 4},
    {field: 'mask', value: false},
    {field: 'numbersOnly', value: true},
    {field: 'size', value: this.config.inputSize},
  ];
}

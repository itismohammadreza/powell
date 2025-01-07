import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputPasswordComponent, InputPasswordModule} from "@powell/components/input-password";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-password-page',
  templateUrl: './input-password.page.html',
  styleUrls: ['./input-password.page.scss'],
  imports: [
    InputPasswordModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputPasswordPage extends PreviewBase {
  @ViewChild(InputPasswordComponent) declare cmpRef: InputPasswordComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', options: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'fluid', value: false},
    {field: 'disabled', value: false},
    {field: 'promptLabel', value: 'لطفا رمز عبور را وارد کنید'},
    {field: 'weakLabel', value: 'ضعیف'},
    {field: 'mediumLabel', value: 'متوسط'},
    {field: 'strongLabel', value: 'قوی'},
    {field: 'feedback', value: true},
    {field: 'toggleMask', value: false},
    {field: 'size', options: 'sizes', value: this.config.inputSize},
    {field: 'placeholder', value: ''},
    {field: 'showClear', value: true},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
  ];
}

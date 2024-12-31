import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InputMaskComponent, InputMaskModule} from "@powell/components/input-mask";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-input-mask-page',
  templateUrl: './input-mask.page.html',
  styleUrls: ['./input-mask.page.scss'],
  imports: [
    InputMaskModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class InputMaskPage extends PreviewBase {
  @ViewChild(InputMaskComponent, {static: true}) declare cmpRef: InputMaskComponent;

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
    {field: 'slotChar', value: '_'},
    {field: 'autoClear', value: true},
    {field: 'showClear', value: true},
    {field: 'placeholder', value: ''},
    {field: 'size', value: this.config.inputSize},
    {field: 'maxlength', value: 100},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'unmask', value: false},
    {field: 'mask', value: '99-999999'},
  ];
}

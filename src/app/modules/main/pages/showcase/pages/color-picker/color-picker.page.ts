import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ColorPickerComponent, ColorPickerModule} from "@powell/components/color-picker";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-color-picker-page',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss'],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class ColorPickerPage extends PreviewBase {
  @ViewChild(ColorPickerComponent, {static: true}) declare cmpRef: ColorPickerComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'icon', value: ''},
    {field: 'labelPos', value: this.config.labelPos},
    {field: 'iconPos', value: 'left'},
    {field: 'size', value: this.config.inputSize},
    {field: 'readonly', value: false},
    {field: 'placeholder', value: ''},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'variant', value: this.config.inputStyle},
    {field: 'inline', value: false},
    {field: 'disabled', value: false},
  ];
}

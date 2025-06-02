import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ColorPickerComponent, ColorPickerModule} from "@powell/components/color-picker";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'color-picker-page',
  templateUrl: './color-picker.page.html',
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class ColorPickerPage extends PreviewBase {
  @ViewChild(ColorPickerComponent) declare cmpRef: ColorPickerComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'inline', value: false},
    {field: 'disabled', value: false},
  ];
}

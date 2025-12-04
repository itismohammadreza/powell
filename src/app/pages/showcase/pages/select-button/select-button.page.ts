import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectButtonComponent, SelectButtonModule} from "@powell/components/select-button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";

@Component({
  selector: 'app-select-button-page',
  templateUrl: './select-button.page.html',
  imports: [
    SelectButtonModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class SelectButtonPage extends PreviewBase {
  @ViewChild(SelectButtonComponent) declare cmpRef: SelectButtonComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'unselectable', value: false},
    {field: 'multiple', value: false},
    {field: 'size', selectOptions: 'sizes', value: this.config.inputSize},
    {field: 'disabled', value: false},
  ];
}

import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectButtonComponent, SelectButtonModule} from "@powell/components/select-button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-select-button-page',
  templateUrl: './select-button.page.html',
  styleUrls: ['./select-button.page.scss'],
  imports: [
    SelectButtonModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class SelectButtonPage extends PreviewBase {
  @ViewChild(SelectButtonComponent, {static: true}) declare cmpRef: SelectButtonComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'unselectable', value: false},
    {field: 'multiple', value: false},
    {field: 'size', value: ''},
    {field: 'disabled', value: false},
  ];
}

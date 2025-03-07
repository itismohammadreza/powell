import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckboxGroupComponent, CheckboxGroupModule} from "@powell/components/checkbox-group";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-checkbox-group-page',
  templateUrl: './checkbox-group.page.html',
  styleUrls: ['./checkbox-group.page.scss'],
  imports: [
    CheckboxGroupModule,
    ReactiveFormsModule,
    PreviewComponent,
  ]
})
export class CheckboxGroupPage extends PreviewBase {
  @ViewChild(CheckboxGroupComponent) declare cmpRef: CheckboxGroupComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'orientation', options: 'orientations', value: 'vertical'},
    {field: 'disabled', value: false},
    {field: 'size', options: 'sizes', value: this.config.inputSize},
    {field: 'readonly', value: false},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
  ];
}

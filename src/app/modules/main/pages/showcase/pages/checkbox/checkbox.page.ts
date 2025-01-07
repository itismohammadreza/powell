import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CheckboxComponent, CheckboxModule} from "@powell/components/checkbox";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-checkbox-page',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
  imports: [
    CheckboxModule,
    ReactiveFormsModule,
    PreviewComponent,
  ]
})
export class CheckboxPage extends PreviewBase {
  @ViewChild(CheckboxComponent) declare cmpRef: CheckboxComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'labelPositions', value: this.config.labelPosition},
    {field: 'additions', options: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'async', value: false},
    {field: 'disabled', value: false},
    {field: 'size', options: 'sizes', value: this.config.inputSize},
    {field: 'readonly', value: false},
    {field: 'variant', options: 'variants', value: this.config.inputStyle},
  ];

  override form = new FormGroup({
    c1: new FormControl(null, [Validators.requiredTrue]),
  });
}

import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToggleButtonComponent, ToggleButtonModule} from "@powell/components/toggle-button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-toggle-button-page',
  templateUrl: './toggle-button.page.html',
  imports: [
    ToggleButtonModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class ToggleButtonPage extends PreviewBase {
  @ViewChild(ToggleButtonComponent) declare cmpRef: ToggleButtonComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'onLabel', value: ''},
    {field: 'offLabel', value: ''},
    {field: 'onIcon', value: 'pi pi-check'},
    {field: 'offIcon', value: 'pi pi-times'},
    {field: 'disabled', value: false},
    {field: 'size', options: 'sizes', value: this.config.inputSize},
  ];

  override form = new FormGroup({
    c1: new FormControl(null, [Validators.requiredTrue]),
  });
}

import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";
import {ToggleSwitchComponent, ToggleSwitchModule} from "@powell/components/toggle-switch";

@Component({
  selector: 'ng-toggle-switch-page',
  templateUrl: './toggle-switch.page.html',
  imports: [
    ToggleSwitchModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class ToggleSwitchPage extends PreviewBase {
  @ViewChild(ToggleSwitchComponent) declare cmpRef: ToggleSwitchComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'async', value: false},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
  ];

  override form = new FormGroup({
    c1: new FormControl(null, [Validators.requiredTrue]),
  });

}

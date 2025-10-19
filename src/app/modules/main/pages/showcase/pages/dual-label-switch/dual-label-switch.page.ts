import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {DualLabelSwitchComponent, DualLabelSwitchModule} from "@powell/components/dual-label-switch";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'app-dual-label-switch-page',
  templateUrl: './dual-label-switch.page.html',
  imports: [
    DualLabelSwitchModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class DualLabelSwitchPage extends PreviewBase {
  @ViewChild(DualLabelSwitchComponent) declare cmpRef: DualLabelSwitchComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'async', value: false},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
  ];
}

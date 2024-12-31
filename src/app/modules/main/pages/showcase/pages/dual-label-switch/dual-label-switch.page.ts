import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {DualLabelSwitchComponent, DualLabelSwitchModule} from "@powell/components/dual-label-switch";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-dual-label-switch-page',
  templateUrl: './dual-label-switch.page.html',
  styleUrls: ['./dual-label-switch.page.scss'],
  imports: [
    DualLabelSwitchModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class DualLabelSwitchPage extends PreviewBase {
  @ViewChild(DualLabelSwitchComponent, {static: true}) declare cmpRef: DualLabelSwitchComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'async', value: false},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
  ];
}

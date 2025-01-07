import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {KnobComponent, KnobModule} from "@powell/components/knob";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-knob-page',
  templateUrl: './knob.page.html',
  styleUrls: ['./knob.page.scss'],
  imports: [
    KnobModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class KnobPage extends PreviewBase {
  @ViewChild(KnobComponent) declare cmpRef: KnobComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'valueTemplate', value: '{value}'},
    {field: 'size', value: 100},
    {field: 'step', value: 1},
    {field: 'min', value: 0},
    {field: 'max', value: 100},
    {field: 'strokeWidth', value: 14},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'showValue', value: true},
  ];
}

import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SliderComponent, SliderModule} from "@powell/components/slider";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-slider-page',
  templateUrl: './slider.page.html',
  imports: [
    SliderModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class SliderPage extends PreviewBase {
  @ViewChild(SliderComponent) declare cmpRef: SliderComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'animate', value: true},
    {field: 'disabled', value: false},
    {field: 'min', value: 0},
    {field: 'max', value: 100},
    {field: 'orientation', selectOptions: 'orientations', value: 'horizontal'},
    {field: 'step', value: 1},
    {field: 'range', value: false},
  ];
}

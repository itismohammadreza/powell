import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RatingComponent, RatingModule} from "@powell/components/rating";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'rating-page',
  templateUrl: './rating.page.html',
  imports: [
    RatingModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class RatingPage extends PreviewBase {
  @ViewChild(RatingComponent) declare cmpRef: RatingComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'readonly', value: false},
    {field: 'stars', value: 5},
  ];
}

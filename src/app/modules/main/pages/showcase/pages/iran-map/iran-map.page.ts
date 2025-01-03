import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {IranMapComponent, IranMapModule} from "@powell/components/iran-map";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-iran-map-page',
  templateUrl: './iran-map.page.html',
  styleUrls: ['./iran-map.page.scss'],
  imports: [
    IranMapModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class IranMapPage extends PreviewBase {
  @ViewChild(IranMapComponent, {static: true}) declare cmpRef: IranMapComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPos', value: this.config.fixLabelPos},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'multiple', value: false},
    {field: 'selectionLimit', value: 31},
    {field: 'async', value: false},
  ];
}

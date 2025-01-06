import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MapComponent, MapModule} from "@powell/components/map";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  imports: [
    MapModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class MapPage extends PreviewBase {
  @ViewChild(MapComponent, {static: true}) declare cmpRef: MapComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', options: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'additions', options: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'multiple', value: false},
    {field: 'clearMarkerOnClick', value: true},
    {field: 'showClear', value: true},
    {field: 'readonly', value: false},
  ];
}

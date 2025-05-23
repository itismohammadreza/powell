import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MapComponent, MapModule} from "@powell/components/map";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  imports: [
    MapModule,
    ReactiveFormsModule,
    PreviewComponent
  ]
})
export class MapPage extends PreviewBase {
  @ViewChild(MapComponent) declare cmpRef: MapComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'label', value: 'label'},
    {field: 'labelWidth', value: 100},
    {field: 'hint', value: ''},
    {field: 'rtl', value: this.config.rtl},
    {field: 'showRequiredStar', value: this.config.showRequiredStar},
    {field: 'labelPosition', selectOptions: 'fixLabelPositions', value: this.config.fixLabelPosition},
    {field: 'additions', selectOptions: 'additions', value: 'none'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'disabled', value: false},
    {field: 'multiple', value: false},
    {field: 'clearMarkerOnClick', value: true},
    {field: 'showClear', value: true},
    {field: 'readonly', value: false},
  ];
}

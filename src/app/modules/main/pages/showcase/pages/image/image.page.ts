import {Component, ViewChild} from '@angular/core';
import {ImageComponent, ImageModule} from "@powell/components/image";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-image-page',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
  imports: [
    ImageModule,
    PreviewComponent
  ]
})
export class ImagePage extends PreviewBase {
  @ViewChild(ImageComponent) declare cmpRef: ImageComponent;

  override previewOptions: PreviewOption[] = [
    {field: 'width', value: 200},
    {field: 'preview', value: true},
    {field: 'doubleTap', value: true},
    {field: 'doubleTapScale', value: 2},
    {field: 'autoZoomOut', value: false},
    {field: 'disableZoomControl', options: 'pinchDisableZoomControls', value: 'auto'},
    {field: 'draggableImage', value: false},
    {field: 'overflow', options: 'pinchOverflows', value: 'visible'},
    {field: 'wheel', value: true},
    {field: 'wheelZoomFactor', value: 0.2},
    {field: 'zoomControlScale', value: 1},
  ];
}

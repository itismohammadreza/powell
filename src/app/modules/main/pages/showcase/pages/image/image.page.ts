import {Component, ViewChild} from '@angular/core';
import {ImageComponent, ImageModule} from "@powell/components/image";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'app-image-page',
  templateUrl: './image.page.html',
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
    {field: 'disableZoomControl', selectOptions: 'pinchDisableZoomControls', value: 'auto'},
    {field: 'draggableImage', value: false},
    {field: 'overflow', selectOptions: 'pinchOverflows', value: 'visible'},
    {field: 'wheel', value: true},
    {field: 'wheelZoomFactor', value: 0.2},
    {field: 'zoomControlScale', value: 1},
  ];
}

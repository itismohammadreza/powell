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
    {field: 'width', value: '200'},
    {field: 'height', value: 'auto'},
    {field: 'preview', value: true},
    {field: 'pinchTransitionDuration', value: 200},
    {field: 'pinchDoubleTap', value: true},
    {field: 'pinchDoubleTapScale', value: 2},
    {field: 'pinchAutoZoomOut', value: false},
    {field: 'pinchDisabled', value: false},
    {field: 'pinchDisablePan', value: false},
    {field: 'pinchOverflow', options: 'pinchOverflows', value: 'visible'},
    {field: 'pinchZoomControlScale', value: 1},
    {field: 'pinchDisableZoomControl', options: 'pinchDisableZoomControls', value: 'auto'},
    {field: 'pinchLimitPan', value: false},
    {field: 'pinchMinPanScale', value: 1.0001},
    {field: 'pinchMinScale', value: 0},
    {field: 'pinchWheel', value: true},
    {field: 'pinchAutoHeight', value: false},
    {field: 'pinchWheelZoomFactor', value: 0.2},
    {field: 'pinchDraggableImage', value: true},
  ];
}

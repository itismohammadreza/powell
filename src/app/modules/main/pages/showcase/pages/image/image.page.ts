import {Component} from '@angular/core';
import {DisableZoomControl, LimitZoom, Listener, Overflow} from "@ng/models/image";

@Component({
  selector: 'ng-image-page',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss']
})
export class ImagePage {
  width: string = '200';
  height: string = '200';
  preview: boolean = true;
  pinchTransitionDuration: number = 6;
  pinchDoubleTap: boolean = false;
  pinchDoubleTapScale: number = 6;
  pinchAutoZoomOut: boolean = false;
  pinchLimitZoom: LimitZoom = 'original image size';
  pinchDisabled: boolean = false;
  pinchDisablePan: boolean = false;
  pinchOverflow: Overflow = 'hidden';
  pinchZoomControlScale: number = 6;
  pinchDisableZoomControl: DisableZoomControl = 'never';
  pinchLimitPan: boolean = false;
  pinchMinPanScale: number = 6;
  pinchMinScale: number = 6;
  pinchListeners: Listener = 'mouse and touch';
  pinchWheel: boolean = false;
  pinchAutoHeight: boolean = false;
  pinchWheelZoomFactor: number = 6;
  pinchDraggableImage: boolean = false;
}

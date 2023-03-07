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
  pinchTransitionDuration: number = 200;
  pinchDoubleTap: boolean = true;
  pinchDoubleTapScale: number = 2;
  pinchAutoZoomOut: boolean = false;
  pinchLimitZoom: LimitZoom = 'original image size';
  pinchDisabled: boolean = false;
  pinchDisablePan: boolean = false;
  pinchOverflow: Overflow = 'hidden';
  pinchZoomControlScale: number = 1;
  pinchDisableZoomControl: DisableZoomControl = 'auto';
  pinchLimitPan: boolean = false;
  pinchMinPanScale: number = 1.0001;
  pinchMinScale: number = 0;
  pinchListeners: Listener = 'mouse and touch';
  pinchWheel: boolean = true;
  pinchAutoHeight: boolean = false;
  pinchWheelZoomFactor: number = 0.2;
  pinchDraggableImage: boolean = false;
}

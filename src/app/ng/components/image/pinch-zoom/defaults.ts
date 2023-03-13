import {NgPinchZoomOptions} from "@ng/models";

export const defaultProperties: NgPinchZoomOptions = {
  transitionDuration: 200,
  doubleTap: true,
  doubleTapScale: 2,
  limitZoom: "original image size",
  autoZoomOut: false,
  zoomControlScale: 1,
  minPanScale: 1.0001,
  minScale: 0,
  listeners: "mouse and touch",
  wheel: true,
  wheelZoomFactor: 0.2,
  draggableImage: false,
  overflow: "hidden",
  disableZoomControl: "auto"
}

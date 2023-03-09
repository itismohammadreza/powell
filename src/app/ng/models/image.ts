export type NgLimitZoom = number | 'original image size';
export type NgOverflow = 'hidden' | 'visible';
export type NgDisableZoomControl = 'disable' | 'never' | 'auto';
export type NgListener = 'auto' | 'mouse and touch';
export type NgTouchEventType =
  | 'touchend'
  | 'pan'
  | 'pinch'
  | 'horizontal-swipe'
  | 'vertical-swipe'
  | 'tap'
  | 'longtap';
export type NgTouchHandler = 'handleTouchstart' | 'handleTouchmove' | 'handleTouchend';
export type NgMouseHandler = 'handleMousedown' | 'handleMousemove' | 'handleMouseup';

export interface NgImageItem {
  preview: string;
  alt: string;
  thumbnail?: string;
  caption?: {
    title?: string;
    subtitle?: string
  };
}

export interface NgBreakPointItem {
  breakpoint: string;
  numVisible: number;
}

export interface NgPinchZoomOptions {
  element?: string;
  transitionDuration?: number;
  doubleTap?: boolean;
  doubleTapScale?: number;
  autoZoomOut?: boolean;
  limitZoom?: NgLimitZoom;
  disablePan?: boolean;
  zoomControlScale?: number;
  limitPan?: boolean;
  minPanScale?: number;
  minScale?: number;
  eventHandler?: any;
  listeners?: NgListener;
  wheel?: boolean;
  fullImage?: {
    path: string,
    minScale?: number
  };
  autoHeight?: boolean;
  wheelZoomFactor?: number;
  draggableImage?: boolean;
  // for component
  disabled?: boolean;
  overflow?: NgOverflow;
  disableZoomControl?: NgDisableZoomControl;
  style?: any;
}

export interface NgTouchOptions {
  element: HTMLElement;
  listeners?: NgListener;
  touchListeners?: any;
  mouseListeners?: any;
  otherListeners?: any;
  resize?: boolean;
}


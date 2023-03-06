export type LimitZoom = number | 'original image size';
export type Overflow = 'hidden' | 'visible';
export type DisableZoomControl = 'disable' | 'never' | 'auto';
export type Listener = 'auto' | 'mouse and touch';
export type TouchEventType =
  | 'touchend'
  | 'pan'
  | 'pinch'
  | 'horizontal-swipe'
  | 'vertical-swipe'
  | 'tap'
  | 'longtap';
export type TouchHandler = 'handleTouchstart' | 'handleTouchmove' | 'handleTouchend';
export type MouseHandler = 'handleMousedown' | 'handleMousemove' | 'handleMouseup';

export interface ImageItem {
  preview: string;
  alt: string;
  thumbnail?: string;
  caption?: {
    title?: string;
    subtitle?: string
  };
}

export interface BreakPointItem {
  breakpoint: string;
  numVisible: number;
}

export interface PinchZoomOptions {
  element?: string;
  transitionDuration?: number;
  doubleTap?: boolean;
  doubleTapScale?: number;
  autoZoomOut?: boolean;
  limitZoom?: LimitZoom;
  disablePan?: boolean;
  zoomControlScale?: number;
  limitPan?: boolean;
  minPanScale?: number;
  minScale?: number;
  eventHandler?: any;
  listeners?: Listener;
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
  overflow?: Overflow;
  disableZoomControl?: DisableZoomControl;
  style?: any;
}

export interface TouchOptions {
  element: HTMLElement;
  listeners?: Listener;
  touchListeners?: any;
  mouseListeners?: any;
  otherListeners?: any;
  resize?: boolean;
}


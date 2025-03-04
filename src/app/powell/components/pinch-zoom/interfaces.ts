export interface PinchZoomOptions {
  element?: HTMLElement;
  doubleTap?: boolean;
  doubleTapScale?: number;
  zoomControlScale?: number;
  transitionDuration?: number;
  autoZoomOut?: boolean;
  limitZoom?: number | string | 'original image size';
  disablePan?: boolean;
  limitPan?: boolean;
  minPanScale?: number;
  minScale?: number;
  listeners?: 'auto' | 'mouse and touch';
  wheel?: boolean;
  fullImage?: {
    path: string;
    minScale?: number;
  };
  autoHeight?: boolean;
  wheelZoomFactor?: number;
  draggableImage?: boolean;
}

export interface PinchZoomComponentProperties extends PinchZoomOptions {
  disabled?: boolean;
  overflow?: 'hidden' | 'visible';
  disableZoomControl?: 'disable' | 'never' | 'auto';
  backgroundColor?: string;
}

export interface TouchesProperties {
  element: HTMLElement;
  listeners?: 'auto' | 'mouse and touch';
  touchListeners?: TouchListeners;
  mouseListeners?: MouseListeners;
  otherListeners?: OtherListeners;
  resize?: boolean;
}

export type PinchEventType =
  | undefined
  | 'touchstart'
  | 'touchend'
  | 'touchmove'
  | 'mousedown'
  | 'mouseup'
  | 'mousemove'
  | 'pan'
  | 'pinch'
  | 'horizontal-swipe'
  | 'vertical-swipe'
  | 'tap'
  | 'longtap'
  | 'wheel'
  | 'double-tap'
  | 'resize';

export type TouchHandler = 'handleTouchstart' | 'handleTouchmove' | 'handleTouchend';
export type MouseHandler = 'handleMousedown' | 'handleMousemove' | 'handleMouseup' | 'handleWheel';
export type OtherHandler = 'handleResize';
export type TouchListeners = Partial<Record<'touchstart' | 'touchmove' | 'touchend', TouchHandler>>;
export type MouseListeners = Partial<Record<'mousedown' | 'mousemove' | 'mouseup' | 'wheel', MouseHandler>>;
export type OtherListeners = Partial<Record<'resize', OtherHandler>>;

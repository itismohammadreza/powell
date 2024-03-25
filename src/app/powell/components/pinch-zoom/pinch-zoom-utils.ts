import {NgMouseHandler, NgPinchZoomOptions, NgTouchEventType, NgTouchOptions} from "@powell/models";

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

export class IvyPinch {
  properties: NgPinchZoomOptions = defaultProperties;
  touches: any;
  element: any;
  elementTarget: any;
  parentElement: any;
  i: number = 0;
  scale: number = 1;
  initialScale: number = 1;
  elementPosition: any;
  eventType: any;
  startX: number = 0;
  startY: number = 0;
  moveX: number = 0;
  moveY: number = 0;
  initialMoveX: number = 0;
  initialMoveY: number = 0;
  moveXC: number = 0;
  moveYC: number = 0;
  lastTap: number = 0;
  draggingMode: boolean = false;
  distance: number = 0;
  doubleTapTimeout: number = 0;
  initialDistance: number = 0;
  events: any = {};
  maxScale!: number;
  defaultMaxScale: number = 3;

  get minPanScale() {
    return this.getPropertiesValue("minPanScale");
  }

  get fullImage() {
    return this.properties.fullImage;
  }

  constructor(properties: any) {
    this.element = properties.element;

    if (!this.element) {
      return;
    }

    this.elementTarget = this.element.querySelector('*').tagName;
    this.parentElement = this.element.parentElement;
    this.properties = Object.assign({}, defaultProperties, properties);
    this.detectLimitZoom();

    this.touches = new Touches({
      element: properties.element,
      listeners: properties.listeners,
      resize: properties.autoHeight,
      mouseListeners: {
        mousedown: "handleMousedown",
        mouseup: "handleMouseup",
        wheel: "handleWheel"
      }
    });

    this.setBasicStyles();

    this.touches.on('touchstart', this.handleTouchstart);
    this.touches.on('touchend', this.handleTouchend);
    this.touches.on('mousedown', this.handleTouchstart);
    this.touches.on('mouseup', this.handleTouchend);
    this.touches.on('pan', this.handlePan);
    this.touches.on('mousemove', this.handlePan);
    this.touches.on('pinch', this.handlePinch);

    if (this.properties.wheel) {
      this.touches.on('wheel', this.handleWheel);
    }

    if (this.properties.doubleTap) {
      this.touches.on('double-tap', this.handleDoubleTap);
    }

    if (this.properties.autoHeight) {
      this.touches.on('resize', this.handleResize);
    }
  }

  handleTouchstart = (event: any) => {
    this.touches.addEventListeners("mousemove", "handleMousemove");
    this.getElementPosition();

    if (this.eventType === undefined) {
      this.getTouchstartPosition(event);
    }
  }

  handleTouchend = (event: any) => {
    if (event.type === "touchend") {
      this.i = 0;
      this.draggingMode = false;
      const touches = event.touches;

      if (this.scale < 1) {
        this.scale = 1;
      }

      if (this.properties.autoZoomOut && this.eventType === 'pinch') {
        this.scale = 1;
      }

      if (this.eventType === 'pinch' ||
        this.eventType === 'pan' && this.scale > this.minPanScale) {
        this.alignImage();
      }

      if (this.eventType === 'pinch' ||
        this.eventType === 'pan' ||
        this.eventType === 'horizontal-swipe' ||
        this.eventType === 'vertical-swipe') {
        this.updateInitialValues();
      }

      this.eventType = 'touchend';
      if (touches && touches.length === 0) {
        this.eventType = undefined;
      }
    }

    if (event.type === "mouseup") {
      this.draggingMode = false;
      this.updateInitialValues();
      this.eventType = undefined;
    }
    this.touches.removeEventListeners("mousemove", "handleMousemove");
  }

  handlePan = (event: any) => {
    if (this.scale < this.minPanScale || this.properties.disablePan) {
      return;
    }
    event.preventDefault();
    const {clientX, clientY} = this.getClientPosition(event);

    if (!this.eventType) {
      this.startX = clientX - this.elementPosition.left;
      this.startY = clientY - this.elementPosition.top;
    }

    this.eventType = 'pan';
    this.moveX = this.initialMoveX + (this.moveLeft(event, 0) - this.startX);
    this.moveY = this.initialMoveY + (this.moveTop(event, 0) - this.startY);

    if (this.properties.limitPan) {
      this.limitPanY();
      this.limitPanX();
    }

    if (event.type === "mousemove" && this.scale > this.minPanScale) {
      this.centeringImage();
    }

    this.transformElement(0);
  }

  handleDoubleTap = (event: any) => {
    this.toggleZoom(event);
  }

  handlePinch = (event: any) => {
    event.preventDefault();

    if (this.eventType === undefined || this.eventType === 'pinch') {
      const touches = event.touches;

      if (!this.eventType) {
        this.initialDistance = this.getDistance(touches);

        const moveLeft0 = this.moveLeft(event, 0);
        const moveLeft1 = this.moveLeft(event, 1);
        const moveTop0 = this.moveTop(event, 0);
        const moveTop1 = this.moveTop(event, 1);

        this.moveXC = ((moveLeft0 + moveLeft1) / 2) - this.initialMoveX;
        this.moveYC = ((moveTop0 + moveTop1) / 2) - this.initialMoveY;
      }

      this.eventType = 'pinch';
      this.distance = this.getDistance(touches);
      this.scale = this.initialScale * (this.distance / this.initialDistance);
      this.moveX = this.initialMoveX - (((this.distance / this.initialDistance) * this.moveXC) - this.moveXC);
      this.moveY = this.initialMoveY - (((this.distance / this.initialDistance) * this.moveYC) - this.moveYC);

      this.handleLimitZoom();

      if (this.properties.limitPan) {
        this.limitPanY();
        this.limitPanX();
      }

      this.transformElement(0);
    }
  }


  handleWheel = (event: any) => {
    event.preventDefault();
    let wheelZoomFactor = this.properties.wheelZoomFactor || 0;
    let zoomFactor = event.deltaY < 0 ? (wheelZoomFactor) : (-wheelZoomFactor);
    let newScale = this.initialScale + zoomFactor;

    if (newScale < (1 + wheelZoomFactor)) {
      newScale = 1;
    } else if (newScale < this.maxScale && newScale > this.maxScale - wheelZoomFactor) {
      newScale = this.maxScale;
    }

    if (newScale < 1 || newScale > this.maxScale) {
      return;
    }

    if (newScale === this.scale) {
      return;
    }

    this.getElementPosition();
    this.scale = newScale;

    let xCenter = (event.clientX - this.elementPosition.left) - this.initialMoveX;
    let yCenter = (event.clientY - this.elementPosition.top) - this.initialMoveY;

    this.setZoom({
      scale: newScale,
      center: [xCenter, yCenter]
    });
  }

  handleResize() {
    this.setAutoHeight();
  }

  handleLimitZoom() {
    const limitZoom = this.maxScale;
    const minScale = this.properties.minScale || 0;

    if (this.scale > limitZoom || this.scale <= minScale) {
      const imageWidth = this.getImageWidth();
      const imageHeight = this.getImageHeight();
      const enlargedImageWidth = imageWidth * this.scale;
      const enlargedImageHeight = imageHeight * this.scale;
      const moveXRatio = this.moveX / (enlargedImageWidth - imageWidth);
      const moveYRatio = this.moveY / (enlargedImageHeight - imageHeight);

      if (this.scale > limitZoom) {
        this.scale = limitZoom;
      }

      if (this.scale <= minScale) {
        this.scale = minScale;
      }

      const newImageWidth = imageWidth * this.scale;
      const newImageHeight = imageHeight * this.scale;

      this.moveX = -Math.abs((moveXRatio * (newImageWidth - imageWidth)));
      this.moveY = -Math.abs((-moveYRatio * (newImageHeight - imageHeight)));
    }
  }

  moveLeft(event: any, index: number = 0) {
    const clientX = this.getClientPosition(event, index).clientX;
    return clientX - this.elementPosition.left;
  }

  moveTop(event: any, index: number = 0) {
    const clientY = this.getClientPosition(event, index).clientY;
    return clientY - this.elementPosition.top;
  }

  centeringImage() {
    const img = this.element.getElementsByTagName(this.elementTarget)[0];
    const initialMoveX = this.moveX;
    const initialMoveY = this.moveY;

    if (this.moveY > 0) {
      this.moveY = 0;
    }
    if (this.moveX > 0) {
      this.moveX = 0;
    }

    if (img) {
      this.limitPanY();
      this.limitPanX();
    }
    if (img && this.scale < 1) {
      if (this.moveX < this.element.offsetWidth * (1 - this.scale)) {
        this.moveX = this.element.offsetWidth * (1 - this.scale);
      }
    }

    return initialMoveX !== this.moveX || initialMoveY !== this.moveY;
  }

  limitPanY() {
    const imgHeight = this.getImageHeight();
    const scaledImgHeight = imgHeight * this.scale;
    const parentHeight = this.parentElement.offsetHeight;
    const elementHeight = this.element.offsetHeight;

    if (scaledImgHeight < parentHeight) {
      this.moveY = (parentHeight - elementHeight * this.scale) / 2;
    } else {
      const imgOffsetTop = ((imgHeight - elementHeight) * this.scale) / 2;

      if (this.moveY > imgOffsetTop) {
        this.moveY = imgOffsetTop;
      } else if ((scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight) + this.moveY < 0) {
        this.moveY = -(scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight);
      }
    }
  }

  limitPanX() {
    const imgWidth = this.getImageWidth();
    const scaledImgWidth = imgWidth * this.scale;
    const parentWidth = this.parentElement.offsetWidth;
    const elementWidth = this.element.offsetWidth;

    if (scaledImgWidth < parentWidth) {
      this.moveX = (parentWidth - elementWidth * this.scale) / 2;
    } else {
      const imgOffsetLeft = ((imgWidth - elementWidth) * this.scale) / 2;

      if (this.moveX > imgOffsetLeft) {
        this.moveX = imgOffsetLeft;
      } else if ((scaledImgWidth + Math.abs(imgOffsetLeft) - parentWidth) + this.moveX < 0) {
        this.moveX = -(imgWidth * this.scale + Math.abs(imgOffsetLeft) - parentWidth);
      }
    }
  }

  setBasicStyles() {
    this.element.style.display = 'flex';
    this.element.style.alignItems = 'center';
    this.element.style.justifyContent = 'center';
    this.element.style.transformOrigin = '0 0';
    this.setImageSize();
    this.setDraggableImage();
  }

  removeBasicStyles() {
    this.element.style.display = '';
    this.element.style.alignItems = '';
    this.element.style.justifyContent = '';
    this.element.style.transformOrigin = '';
    this.removeImageSize();
    this.removeDraggableImage();
  }

  setDraggableImage() {
    const imgElement = this.getImageElement();

    if (imgElement) {
      imgElement.draggable = this.properties.draggableImage;
    }
  }

  removeDraggableImage() {
    const imgElement = this.getImageElement();

    if (imgElement) {
      imgElement.draggable = true;
    }
  }

  setImageSize() {
    const imgElement = this.element.getElementsByTagName(this.elementTarget);

    if (imgElement.length) {
      this.setAutoHeight();
    }
  }

  setAutoHeight() {
    const imgElement = this.element.getElementsByTagName(this.elementTarget);

    if (!this.properties.autoHeight || !imgElement.length) {
      return;
    }

    const imgNaturalWidth = imgElement[0].getAttribute("width");
    const imgNaturalHeight = imgElement[0].getAttribute("height");
    const sizeRatio = imgNaturalWidth / imgNaturalHeight;
    const parentWidth = this.parentElement.offsetWidth;

    imgElement[0].style.maxHeight = parentWidth / sizeRatio + "px";
  }

  removeImageSize() {
    const imgElement = this.element.getElementsByTagName(this.elementTarget);

    if (imgElement.length) {
      imgElement[0].style.maxWidth = '';
      imgElement[0].style.maxHeight = '';
    }
  }

  getElementPosition() {
    this.elementPosition = this.element.parentElement.getBoundingClientRect();
  }

  getTouchstartPosition(event: any) {
    const {
      clientX,
      clientY
    } = this.getClientPosition(event);

    this.startX = clientX - this.elementPosition.left;
    this.startY = clientY - this.elementPosition.top;
  }

  getClientPosition(event: any, index: number = 0) {
    let clientX;
    let clientY;

    if (event.type === "touchstart" || event.type === "touchmove") {
      clientX = event.touches[index].clientX;
      clientY = event.touches[index].clientY;
    }
    if (event.type === "mousedown" || event.type === "mousemove") {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      clientX,
      clientY
    };
  }

  resetScale() {
    this.scale = 1;
    this.moveX = 0;
    this.moveY = 0;
    this.updateInitialValues();
    this.transformElement(this.properties.transitionDuration);
  }

  updateInitialValues() {
    this.initialScale = this.scale;
    this.initialMoveX = this.moveX;
    this.initialMoveY = this.moveY;
  }

  getDistance(touches: any) {
    return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
  }

  getImageHeight() {
    const img = this.element.getElementsByTagName(this.elementTarget)[0];
    return img.offsetHeight;
  }

  getImageWidth() {
    const img = this.element.getElementsByTagName(this.elementTarget)[0];
    return img.offsetWidth;
  }

  transformElement(duration: any) {
    this.element.style.transition = "all " + duration + "ms";
    this.element.style.transform = "matrix(" + (+this.scale) + ", 0, 0, " + (+this.scale) + ", " + (+this.moveX) + ", " + (+this.moveY) + ")";
    if (this.moveX || this.moveY) {
      this.element.classList.add('transformed')
    } else {
      this.element.classList.remove('transformed')
    }
  }

  isTouchScreen() {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    if (('ontouchstart' in window)) {
      return true;
    }

    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return this.getMatchMedia(query);
  }

  getMatchMedia(query: any) {
    return window.matchMedia(query).matches;
  }

  isDragging() {
    if (this.properties.disablePan) {
      return false;
    }

    const imgHeight = this.getImageHeight();
    const imgWidth = this.getImageWidth();

    if (this.scale > 1) {
      return imgHeight * this.scale > this.parentElement.offsetHeight ||
        imgWidth * this.scale > this.parentElement.offsetWidth;
    }
    if (this.scale === 1) {
      return imgHeight > this.parentElement.offsetHeight ||
        imgWidth > this.parentElement.offsetWidth;
    }

    return undefined;
  }

  detectLimitZoom() {
    this.maxScale = this.defaultMaxScale;

    if (this.properties.limitZoom === "original image size" &&
      this.elementTarget === "IMG") {
      this.pollLimitZoomForOriginalImage();
    }
  }

  pollLimitZoomForOriginalImage() {
    let poll = setInterval(() => {
      let maxScaleForOriginalImage = this.getMaxScaleForOriginalImage();
      if (typeof maxScaleForOriginalImage === 'number') {
        this.maxScale = maxScaleForOriginalImage;
        clearInterval(poll);
      }
    }, 10);
  }

  getMaxScaleForOriginalImage() {
    let maxScale!: number;
    let img = this.element.getElementsByTagName("img")[0];

    if (img.naturalWidth && img.offsetWidth) {
      maxScale = img.naturalWidth / img.offsetWidth;
    }

    return maxScale;
  }

  getImageElement() {
    const imgElement = this.element.getElementsByTagName(this.elementTarget);

    if (imgElement.length) {
      return imgElement[0];
    }
  }

  toggleZoom(event: any = false) {
    if (this.initialScale === 1) {
      if (event?.changedTouches) {
        if (this.properties.doubleTapScale === undefined) {
          return;
        }

        const changedTouches = event.changedTouches;
        this.scale = this.initialScale * this.properties.doubleTapScale;
        this.moveX = this.initialMoveX - (changedTouches[0].clientX - this.elementPosition.left) * (this.properties.doubleTapScale - 1);
        this.moveY = this.initialMoveY - (changedTouches[0].clientY - this.elementPosition.top) * (this.properties.doubleTapScale - 1);
      } else {
        let zoomControlScale = this.properties.zoomControlScale || 0;
        this.scale = this.initialScale * (zoomControlScale + 1);
        this.moveX = this.initialMoveX - this.element.offsetWidth * (this.scale - 1) / 2;
        this.moveY = this.initialMoveY - this.element.offsetHeight * (this.scale - 1) / 2;
      }

      this.centeringImage();
      this.updateInitialValues();
      this.transformElement(this.properties.transitionDuration);
    } else {
      this.resetScale();
    }
  }

  setZoom(properties: { scale: number, center?: number[] }) {
    this.scale = properties.scale;

    let xCenter;
    let yCenter;
    let visibleAreaWidth = this.element.offsetWidth;
    let visibleAreaHeight = this.element.offsetHeight;
    let scalingPercent = (visibleAreaWidth * this.scale) / (visibleAreaWidth * this.initialScale);

    if (properties.center) {
      xCenter = properties.center[0];
      yCenter = properties.center[1];
    } else {
      xCenter = visibleAreaWidth / 2 - this.initialMoveX;
      yCenter = visibleAreaHeight / 2 - this.initialMoveY;
    }

    this.moveX = this.initialMoveX - ((scalingPercent * xCenter) - xCenter);
    this.moveY = this.initialMoveY - ((scalingPercent * yCenter) - yCenter);

    this.centeringImage();
    this.updateInitialValues();
    this.transformElement(this.properties.transitionDuration);
  }

  alignImage() {
    const isMoveChanged = this.centeringImage();

    if (isMoveChanged) {
      this.updateInitialValues();
      this.transformElement(this.properties.transitionDuration);
    }
  }

  destroy() {
    this.removeBasicStyles();
    this.touches.destroy();
  }

  getPropertiesValue(propertyName: keyof NgPinchZoomOptions) {
    if (this.properties && this.properties[propertyName]) {
      return this.properties[propertyName]
    } else {
      return defaultProperties[propertyName];
    }
  }
}

export class Touches {
  properties: NgTouchOptions;
  element: HTMLElement;
  elementPosition: DOMRect;
  eventType: NgTouchEventType = undefined;
  handlers: any = {};
  startX = 0;
  startY = 0;
  lastTap = 0;
  doubleTapTimeout: any;
  doubleTapMinTimeout = 300;
  tapMinTimeout = 200;
  touchstartTime = 0;
  i: number = 0;
  isMousedown = false;

  _touchListeners: any = {
    touchstart: "handleTouchstart",
    touchmove: "handleTouchmove",
    touchend: "handleTouchend"
  }
  _mouseListeners: any = {
    mousedown: "handleMousedown",
    mousemove: "handleMousemove",
    mouseup: "handleMouseup",
    wheel: "handleWheel"
  }
  _otherListeners: any = {
    resize: "handleResize"
  }

  get touchListeners() {
    return this.properties.touchListeners ? this.properties.touchListeners : this._touchListeners;
  }

  get mouseListeners() {
    return this.properties.mouseListeners ? this.properties.mouseListeners : this._mouseListeners;
  }

  get otherListeners() {
    return this.properties.otherListeners ? this.properties.otherListeners : this._otherListeners;
  }

  constructor(properties: NgTouchOptions) {
    this.properties = properties;
    this.element = this.properties.element;
    this.elementPosition = this.getElementPosition();

    this.toggleEventListeners('addEventListener');
  }

  destroy() {
    this.toggleEventListeners('removeEventListener');
  }

  toggleEventListeners(action: 'addEventListener' | 'removeEventListener') {
    let listeners;

    if (this.properties.listeners === 'mouse and touch') {
      listeners = Object.assign(this.touchListeners, this.mouseListeners);
    } else {
      listeners = this.detectTouchScreen() ? this.touchListeners : this.mouseListeners;
    }

    if (this.properties.resize) {
      listeners = Object.assign(listeners, this.otherListeners);
    }

    for (const listener in listeners) {
      const handler: NgMouseHandler = listeners[listener];

      // Window
      if (listener === "resize") {
        if (action === 'addEventListener') {
          window.addEventListener(listener, this[handler], false);
        }
        if (action === 'removeEventListener') {
          window.removeEventListener(listener, this[handler], false);
        }
        // Document
      } else if (listener === 'mouseup' || listener === "mousemove") {
        if (action === 'addEventListener') {
          document.addEventListener(listener, this[handler], false);
        }
        if (action === 'removeEventListener') {
          document.removeEventListener(listener, this[handler], false);
        }
        // Element
      } else {
        if (action === 'addEventListener') {
          this.element.addEventListener(listener, this[handler], false);
        }
        if (action === 'removeEventListener') {
          this.element.removeEventListener(listener, this[handler], false);
        }
      }
    }
  }

  addEventListeners(listener: string) {
    const handler: NgMouseHandler = this._mouseListeners[listener];
    window.addEventListener(listener, this[handler], false);
  }

  removeEventListeners(listener: string) {
    const handler: NgMouseHandler = this._mouseListeners[listener];
    window.removeEventListener(listener, this[handler], false);
  }

  handleTouchstart = (event: any) => {
    this.elementPosition = this.getElementPosition();
    this.touchstartTime = new Date().getTime();

    if (this.eventType === undefined) {
      this.getTouchstartPosition(event);
    }

    this.runHandler("touchstart", event);
  }

  handleTouchmove = (event: any) => {
    const touches = event.touches;
    if (this.detectPan(touches)) {
      this.runHandler("pan", event);
    }
    if (this.detectPinch(event)) {
      this.runHandler("pinch", event);
    }
  }

  handleLinearSwipe(event: any) {
    this.i++;
    if (this.i > 3) {
      this.eventType = this.getLinearSwipeType(event);
    }

    if (this.eventType === 'horizontal-swipe') {
      this.runHandler('horizontal-swipe', event);
    }

    if (this.eventType === 'vertical-swipe') {
      this.runHandler('vertical-swipe', event);
    }
  }

  handleTouchend = (event: any) => {
    const touches = event.touches;

    if (this.detectDoubleTap()) {
      this.runHandler("double-tap", event);
    }

    this.detectTap();

    this.runHandler("touchend", event);
    this.eventType = 'touchend';

    if (touches && touches.length === 0) {
      this.eventType = undefined;
      this.i = 0;
    }
  }

  handleMousedown = (event: any) => {
    this.isMousedown = true;
    this.elementPosition = this.getElementPosition();
    this.touchstartTime = new Date().getTime();

    if (this.eventType === undefined) {
      this.getMousedownPosition(event);
    }

    this.runHandler("mousedown", event);
  }

  handleMousemove = (event: any) => {
    if (!this.isMousedown) {
      return;
    }

    this.runHandler("pan", event);

    switch (this.detectLinearSwipe(event)) {
      case "horizontal-swipe":
        event.swipeType = "horizontal-swipe";
        this.runHandler("horizontal-swipe", event);
        break;
      case "vertical-swipe":
        event.swipeType = "vertical-swipe";
        this.runHandler("vertical-swipe", event);
        break;
    }

    if (this.detectLinearSwipe(event) ||
      this.eventType === 'horizontal-swipe' ||
      this.eventType === 'vertical-swipe') {

      this.handleLinearSwipe(event);
    }
  }

  handleMouseup = (event: any) => {
    this.detectTap();

    this.isMousedown = false;
    this.runHandler("mouseup", event);
    this.eventType = undefined;
    this.i = 0;
  }

  handleWheel = (event: any) => {
    this.runHandler("wheel", event);
  }

  handleResize = (event: any) => {
    this.runHandler("resize", event);
  }

  runHandler(eventName: any, response: any) {
    if (this.handlers[eventName]) {
      this.handlers[eventName](response);
    }
  }

  detectPan(touches: any) {
    return touches.length === 1 && !this.eventType || this.eventType === 'pan';
  }

  detectDoubleTap() {
    if (this.eventType != undefined) {
      return;
    }

    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTap;

    clearTimeout(this.doubleTapTimeout);

    if (tapLength < this.doubleTapMinTimeout && tapLength > 0) {
      return true;
    } else {
      this.doubleTapTimeout = setTimeout(() => {
        clearTimeout(this.doubleTapTimeout);
      }, this.doubleTapMinTimeout);
    }
    this.lastTap = currentTime;

    return undefined;
  }

  detectTap() {
    if (this.eventType != undefined) {
      return;
    }

    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.touchstartTime;

    if (tapLength > 0) {
      if (tapLength < this.tapMinTimeout) {
        this.runHandler("tap", {});
      } else {
        this.runHandler("longtap", {});
      }
    }
  }

  detectPinch(event: any) {
    const touches = event.touches;
    return (touches.length === 2 && this.eventType === undefined) || this.eventType === 'pinch';
  }

  detectLinearSwipe(event: any) {
    const touches = event.touches;

    if (touches) {
      if (touches.length === 1 && !this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
        return this.getLinearSwipeType(event);
      }
    } else {
      if (!this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
        return this.getLinearSwipeType(event);
      }
    }

    return undefined;
  }

  getLinearSwipeType(event: any) {
    if (this.eventType !== 'horizontal-swipe' && this.eventType !== 'vertical-swipe') {
      const movementX = Math.abs(this.moveLeft(0, event) - this.startX);
      const movementY = Math.abs(this.moveTop(0, event) - this.startY);

      if ((movementY * 3) > movementX) {
        return 'vertical-swipe';
      } else {
        return 'horizontal-swipe';
      }
    } else {
      return this.eventType;
    }
  }

  getElementPosition() {
    return this.element.getBoundingClientRect();
  }

  getTouchstartPosition(event: any) {
    this.startX = event.touches[0].clientX - this.elementPosition.left;
    this.startY = event.touches[0].clientY - this.elementPosition.top;
  }

  getMousedownPosition(event: any) {
    this.startX = event.clientX - this.elementPosition.left;
    this.startY = event.clientY - this.elementPosition.top;
  }

  moveLeft(index: any, event: any) {
    const touches = event.touches;

    if (touches) {
      return touches[index].clientX - this.elementPosition.left;
    } else {
      return event.clientX - this.elementPosition.left;
    }
  }

  moveTop(index: any, event: any) {
    const touches = event.touches;

    if (touches) {
      return touches[index].clientY - this.elementPosition.top;
    } else {
      return event.clientY - this.elementPosition.top;
    }
  }

  detectTouchScreen() {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = function (query: any) {
      return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window)) {
      return true;
    }

    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  on(event: NgTouchEventType, handler: Function) {
    if (event) {
      this.handlers[event] = handler;
    }
  }
}

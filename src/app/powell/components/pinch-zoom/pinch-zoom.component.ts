import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {PinchZoomComponentProperties} from './interfaces';
import {backwardCompatibilityProperties, defaultProperties} from './properties';
import {IvyPinch} from './ivypinch';

export const _defaultComponentProperties: PinchZoomComponentProperties = {
  overflow: 'visible',
  disableZoomControl: 'auto',
  backgroundColor: 'rgba(0,0,0,0.85)',
};

@Component({
  selector: 'pw-pinch-zoom',
  templateUrl: './pinch-zoom.component.html',
  standalone: false,
})
export class PinchZoomComponent implements OnInit, OnDestroy, OnChanges {
  private pinchZoom: IvyPinch;
  private _properties!: PinchZoomComponentProperties;
  private readonly defaultComponentProperties!: PinchZoomComponentProperties;
  private _transitionDuration!: number;
  private _doubleTap!: boolean;
  private _doubleTapScale!: number;
  private _autoZoomOut!: boolean;
  private _limitZoom!: number | 'original image size';

  @Input('properties') set properties(value: PinchZoomComponentProperties) {
    if (value) {
      this._properties = value;
    }
  }

  get properties() {
    return this._properties;
  }

  // transitionDuration
  @Input('transition-duration') set transitionDurationBackwardCompatibility(value: number) {
    if (value) {
      this._transitionDuration = value;
    }
  }

  @Input('transitionDuration') set transitionDuration(value: number) {
    if (value) {
      this._transitionDuration = value;
    }
  }

  get transitionDuration() {
    return this._transitionDuration;
  }

  // doubleTap
  @Input('double-tap') set doubleTapBackwardCompatibility(value: boolean) {
    if (value) {
      this._doubleTap = value;
    }
  }

  @Input('doubleTap') set doubleTap(value: boolean) {
    if (value) {
      this._doubleTap = value;
    }
  }

  get doubleTap() {
    return this._doubleTap;
  }

  // doubleTapScale
  @Input('double-tap-scale') set doubleTapScaleBackwardCompatibility(value: number) {
    if (value) {
      this._doubleTapScale = value;
    }
  }

  @Input('doubleTapScale') set doubleTapScale(value: number) {
    if (value) {
      this._doubleTapScale = value;
    }
  }

  get doubleTapScale() {
    return this._doubleTapScale;
  }

  // autoZoomOut
  @Input('auto-zoom-out') set autoZoomOutBackwardCompatibility(value: boolean) {
    if (value) {
      this._autoZoomOut = value;
    }
  }

  @Input('autoZoomOut') set autoZoomOut(value: boolean) {
    if (value) {
      this._autoZoomOut = value;
    }
  }

  get autoZoomOut() {
    return this._autoZoomOut;
  }

  // limitZoom
  @Input('limit-zoom') set limitZoomBackwardCompatibility(value: number | 'original image size') {
    if (value) {
      this._limitZoom = value;
    }
  }

  @Input('limitZoom') set limitZoom(value: number | 'original image size') {
    if (value) {
      this._limitZoom = value;
    }
  }

  get limitZoom() {
    return this._limitZoom;
  }

  @Input() disabled!: boolean;
  @Input() disablePan!: boolean;
  @Input() overflow!: 'hidden' | 'visible';
  @Input() zoomControlScale!: number;
  @Input() disableZoomControl!: 'disable' | 'never' | 'auto';
  @Input() backgroundColor!: string;
  @Input() limitPan!: boolean;
  @Input() minPanScale!: number;
  @Input() minScale!: number;
  @Input() listeners!: 'auto' | 'mouse and touch';
  @Input() wheel!: boolean;
  @Input() autoHeight!: boolean;
  @Input() wheelZoomFactor!: number;
  @Input() draggableImage!: boolean;

  @Output() onZoomControlClick = new EventEmitter();

  @HostBinding('style.overflow')
  get hostOverflow() {
    return this.properties['overflow'];
  }

  @HostBinding('style.background-color')
  get hostBackgroundColor() {
    return this.properties['backgroundColor'];
  }

  get isTouchScreen() {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = (query: string) => {
      return window.matchMedia(query).matches;
    };

    if ('ontouchstart' in window) {
      return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  get isDragging() {
    return this.pinchZoom?.isDragging();
  }

  get isDisabled() {
    return this._properties.disabled;
  }

  get scale() {
    return this.pinchZoom.scale;
  }

  get isZoomedIn() {
    return this.scale > 1;
  }

  get scaleLevel() {
    return Math.round(this.scale / this._zoomControlScale);
  }

  get maxScale() {
    return this.pinchZoom.maxScale;
  }

  get isZoomLimitReached() {
    return this.scale >= this.maxScale;
  }

  get _zoomControlScale() {
    return this.getPropertiesValue('zoomControlScale');
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.defaultComponentProperties = this.getDefaultComponentProperties();
    this.applyPropertiesDefault(this.defaultComponentProperties, {});
  }

  ngOnInit() {
    this.initPinchZoom();
    /* Calls the method until the image size is available */
    this.detectLimitZoom();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changedProperties = this.getProperties(changes);
    changedProperties = this.renameProperties(changedProperties);

    this.applyPropertiesDefault(this.defaultComponentProperties, changedProperties);
  }

  ngOnDestroy() {
    this.destroy();
  }

  private initPinchZoom() {
    if (this._properties.disabled) {
      return;
    }

    this._properties.limitZoom = this.limitZoom;
    this._properties.element = this.elementRef.nativeElement.querySelector('.pinch-zoom-content');
    this.pinchZoom = new IvyPinch(this.properties);
  }

  private getProperties(changes: SimpleChanges) {
    let properties: PinchZoomComponentProperties = {};

    for (const prop in changes) {
      if (prop !== 'properties') {
        properties[prop] = changes[prop].currentValue;
      }
      if (prop === 'properties') {
        properties = changes[prop].currentValue;
      }
    }
    return properties;
  }

  private renameProperties(
    properties: PinchZoomComponentProperties | Record<keyof typeof backwardCompatibilityProperties, unknown>
  ) {
    for (const prop in properties) {
      if (backwardCompatibilityProperties[prop]) {
        properties[backwardCompatibilityProperties[prop]] = properties[prop];
        delete properties[prop];
      }
    }

    return properties as PinchZoomComponentProperties;
  }

  private applyPropertiesDefault(defaultProperties: PinchZoomComponentProperties, properties: PinchZoomComponentProperties) {
    this.properties = Object.assign({}, defaultProperties, properties);
  }

  toggleZoom() {
    this.onZoomControlClick.emit();
    this.pinchZoom?.toggleZoom();
  }

  isControl() {
    if (this.isDisabled) {
      return false;
    }

    if (this._properties.disableZoomControl === 'disable') {
      return false;
    }

    if (this.isTouchScreen && this._properties.disableZoomControl === 'auto') {
      return false;
    }

    return true;
  }

  detectLimitZoom() {
    this.pinchZoom?.detectLimitZoom();
  }

  destroy() {
    this.pinchZoom?.destroy();
  }

  private getPropertiesValue<K extends keyof PinchZoomComponentProperties>(propertyName: K) {
    if (this.properties && this.properties[propertyName]) {
      return this.properties[propertyName];
    } else {
      return this.defaultComponentProperties[propertyName];
    }
  }

  private getDefaultComponentProperties() {
    return {...defaultProperties, ..._defaultComponentProperties} as PinchZoomComponentProperties;
  }
}

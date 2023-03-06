import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {defaultProperties} from './defaults';
import {IvyPinch} from './ivypinch';
import {DisableZoomControl, LimitZoom, Listener, Overflow, PinchZoomOptions} from "@ng/models/image";

@Component({
  selector: 'ng-pinch-zoom',
  templateUrl: './pinch-zoom.component.html',
  styleUrls: ['./pinch-zoom.component.scss']
})

export class PinchZoomComponent implements OnInit, OnChanges, OnDestroy {
  @Input() transitionDuration: number;
  @Input() doubleTap: boolean
  @Input() doubleTapScale: number;
  @Input() autoZoomOut: boolean;
  @Input() limitZoom: LimitZoom;
  @Input() disabled: boolean;
  @Input() disablePan: boolean;
  @Input() overflow: Overflow;
  @Input() zoomControlScale: number;
  @Input() disableZoomControl: DisableZoomControl;
  @Input() backgroundColor: string;
  @Input() limitPan: boolean;
  @Input() minPanScale: number;
  @Input() minScale: number;
  @Input() listeners: Listener;
  @Input() wheel: boolean;
  @Input() autoHeight: boolean;
  @Input() wheelZoomFactor: number;
  @Input() draggableImage: boolean;
  @Input() style: any;

  properties: PinchZoomOptions;
  ivyPinch: IvyPinch;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.initPinchZoom();
  }

  ngOnChanges(changes: SimpleChanges) {
    let properties: PinchZoomOptions = {};
    for (const prop in changes) {
      properties[prop] = changes[prop].currentValue;
    }
    this.applyPropertiesDefault(defaultProperties, properties);
  }

  initPinchZoom() {
    if (this.properties.disabled) {
      return;
    }
    this.properties.element = this.el.nativeElement.querySelector('.pinch-zoom-content');
    this.ivyPinch = new IvyPinch(this.properties);
    if (this.ivyPinch) {
      this.ivyPinch.detectLimitZoom();
    }
  }

  applyPropertiesDefault(defaultProperties: PinchZoomOptions, properties: PinchZoomOptions) {
    this.properties = Object.assign({}, defaultProperties, properties);
  }

  get isDragging() {
    return this.ivyPinch ? this.ivyPinch.isDragging() : undefined;
  }

  ngOnDestroy() {
    this.ivyPinch.destroy();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  NgCssObject,
  NgDisableZoomControl,
  NgLimitZoom,
  NgListener,
  NgOverflow,
  NgPinchZoomOptions
} from "@powell/models";
import {defaultProperties, IvyPinch} from "@powell/components/pinch-zoom";

@Component({
  selector: 'ng-pinch-zoom',
  templateUrl: './pinch-zoom.component.html',
  styleUrls: ['./pinch-zoom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PinchZoomComponent implements OnInit, OnChanges, OnDestroy {
  @Input() transitionDuration: number;
  @Input() doubleTap: boolean
  @Input() doubleTapScale: number;
  @Input() autoZoomOut: boolean;
  @Input() limitZoom: NgLimitZoom;
  @Input() disabled: boolean;
  @Input() disablePan: boolean;
  @Input() overflow: NgOverflow;
  @Input() zoomControlScale: number;
  @Input() disableZoomControl: NgDisableZoomControl;
  @Input() limitPan: boolean;
  @Input() minPanScale: number;
  @Input() minScale: number;
  @Input() listeners: NgListener;
  @Input() wheel: boolean;
  @Input() autoHeight: boolean;
  @Input() wheelZoomFactor: number;
  @Input() draggableImage: boolean;
  @Input() style: NgCssObject;
  @Input() styleClass: string;

  properties: NgPinchZoomOptions;
  ivyPinch: IvyPinch;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.initPinchZoom();
  }

  ngOnChanges(changes: SimpleChanges) {
    let properties: NgPinchZoomOptions = {};
    for (const prop in changes) {
      if (changes[prop].currentValue != undefined) {
        properties[prop] = changes[prop].currentValue;
      }
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

  applyPropertiesDefault(defaultProperties: NgPinchZoomOptions, properties: NgPinchZoomOptions) {
    this.properties = Object.assign({}, defaultProperties, properties);
  }

  ngOnDestroy() {
    if (this.properties.disabled) {
      return;
    }
    this.ivyPinch.destroy();
  }
}

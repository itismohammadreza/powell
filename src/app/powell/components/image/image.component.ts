import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {AnimationEvent} from "@angular/animations";
import {
  NgCssObject,
  NgPinchDisableZoomControl,
  NgImageLoading,
  NgPinchLimitZoom,
  NgPinchListener,
  NgOverflow
} from "@powell/models";
import {SafeUrl} from "@angular/platform-browser";
import {TemplateDirective} from "@powell/directives/template";
import {PinchZoomComponentProperties} from "@powell/components/pinch-zoom/interfaces";

@Component({
  selector: 'ng-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  standalone: false
})
export class ImageComponent implements AfterContentInit {
  // native properties
  @Input() imageClass: string;
  @Input() imageStyle: NgCssObject;
  @Input() styleClass: string;
  @Input() style: NgCssObject;
  @Input() src: string | SafeUrl;
  @Input() srcSet: string | SafeUrl;
  @Input() sizes: string;
  @Input() previewImageSrc: string | SafeUrl;
  @Input() previewImageSrcSet: string | SafeUrl;
  @Input() previewImageSizes: string;
  @Input() alt: string;
  @Input() width: string;
  @Input() height: string;
  @Input() loading: NgImageLoading;
  @Input() appendTo: any;
  @Input() preview: boolean = false;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  // pinch-zoom properties
  @Input() pinchProperties: PinchZoomComponentProperties = {
    transitionDuration: 200,
    doubleTap: true,
    doubleTapScale: 2,
    autoZoomOut: false,
    disabled: false,
    disablePan: false,
    overflow: 'visible',
    zoomControlScale: 1,
    disableZoomControl: 'auto',
    limitPan: false,
    minPanScale: 1.0001,
    minScale: 0,
    wheel: true,
    autoHeight: false,
    wheelZoomFactor: 0.2,
    draggableImage: true,
  };
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @Output() onHide = new EventEmitter<AnimationEvent>();
  @Output() onImageError = new EventEmitter<Event>();
  @ViewChild('mask') mask: ElementRef;
  @ViewChild('previewButton') previewButton: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Record<string, TemplateRef<any>> = {};

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }
}

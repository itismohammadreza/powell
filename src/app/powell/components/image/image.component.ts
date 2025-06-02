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
import {CssObject, ImageLoading} from "@powell/models";
import {SafeUrl} from "@angular/platform-browser";
import {TemplateDirective} from "@powell/directives/template";
import {PinchZoomComponentProperties} from "@powell/components/pinch-zoom/interfaces";

@Component({
  selector: 'pw-image',
  templateUrl: './image.component.html',
  standalone: false
})
export class ImageComponent implements AfterContentInit {
  // native properties
  @Input() imageClass: string;
  @Input() imageStyle: CssObject;
  @Input() styleClass: string;
  @Input() style: CssObject;
  @Input() src: string | SafeUrl;
  @Input() srcSet: string | SafeUrl;
  @Input() sizes: string;
  @Input() previewImageSrc: string | SafeUrl;
  @Input() previewImageSrcSet: string | SafeUrl;
  @Input() previewImageSizes: string;
  @Input() alt: string;
  @Input() width: string;
  @Input() height: string;
  @Input() loading: ImageLoading;
  @Input() appendTo: any;
  @Input() preview: boolean = false;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  // pinch-zoom properties
  @Input() pinchProperties: PinchZoomComponentProperties = {
    autoZoomOut: false,
    backgroundColor: "rgba(0,0,0,0.85)",
    disableZoomControl: "auto",
    doubleTap: true,
    doubleTapScale: 2,
    draggableImage: false,
    limitZoom: "original image size",
    listeners: "mouse and touch",
    minPanScale: 1.0001,
    minScale: 0,
    overflow: "visible",
    transitionDuration: 200,
    wheel: true,
    wheelZoomFactor: 0.2,
    zoomControlScale: 1,
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

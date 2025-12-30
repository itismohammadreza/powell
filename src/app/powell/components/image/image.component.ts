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
  @Input() imageClass: Optional<string>;
  @Input() imageStyle: Optional<CssObject>;
  @Input() src: Optional<string | SafeUrl>;
  @Input() srcSet: Optional<string | SafeUrl>;
  @Input() sizes: Optional<string>;
  @Input() previewImageSrc: Optional<string | SafeUrl>;
  @Input() previewImageSrcSet: Optional<string | SafeUrl>;
  @Input() previewImageSizes: Optional<string>;
  @Input() alt: Optional<string>;
  @Input() width: Optional<string>;
  @Input() height: Optional<string>;
  @Input() loading: Optional<ImageLoading>;
  @Input() preview: boolean = false;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() appendTo: Optional<SafeAny>;
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
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();
  @Output() onImageError = new EventEmitter<Event>();
  @ViewChild('mask') mask!: ElementRef;
  @ViewChild('previewButton') previewButton!: ElementRef;
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  templateMap: Record<string, TemplateRef<SafeAny>> = {};

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }
}

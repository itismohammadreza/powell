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
import {NgCssObject, NgDisableZoomControl, NgImageLoading, NgLimitZoom, NgListener, NgOverflow} from "@powell/models";
import {SafeUrl} from "@angular/platform-browser";
import {TemplateDirective} from "@powell/directives/template";

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
  @Input() pinchTransitionDuration: number;
  @Input() pinchDoubleTap: boolean
  @Input() pinchDoubleTapScale: number;
  @Input() pinchAutoZoomOut: boolean;
  @Input() pinchLimitZoom: NgLimitZoom;
  @Input() pinchDisabled: boolean;
  @Input() pinchDisablePan: boolean;
  @Input() pinchOverflow: NgOverflow;
  @Input() pinchZoomControlScale: number;
  @Input() pinchDisableZoomControl: NgDisableZoomControl;
  @Input() pinchLimitPan: boolean;
  @Input() pinchMinPanScale: number;
  @Input() pinchMinScale: number;
  @Input() pinchListeners: NgListener;
  @Input() pinchWheel: boolean;
  @Input() pinchAutoHeight: boolean;
  @Input() pinchWheelZoomFactor: number;
  @Input() pinchDraggableImage: boolean;
  @Input() previewStyle: NgCssObject;
  @Input() previewStyleClass: string;
  @Input() imageStyleClass: string;
  @Input() previewImageStyle: NgCssObject;
  @Input() previewImageStyleClass: string;
  @Input() errorPlaceholderSrc: string;
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

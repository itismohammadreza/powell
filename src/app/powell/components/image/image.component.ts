import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {animate, AnimationEvent, style, transition, trigger} from "@angular/animations";
import {ConfigService} from "@powell/api";
import {TemplateDirective} from "@powell/directives/template";
import {CSSStyleDeclaration, NgDisableZoomControl, NgLimitZoom, NgListener, NgOverflow} from "@powell/models";
import {PrimeDomHandler, PrimeZIndexUtils} from "@powell/primeng/api";

@Component({
  selector: 'ng-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.7)', opacity: 0}), animate('{{showTransitionParams}}')
      ]),
      transition('visible => void', [
        animate('{{hideTransitionParams}}', style({transform: 'scale(0.7)', opacity: 0}))
      ])
    ])
  ],
  host: {
    class: 'p-element'
  }
})
export class ImageComponent implements AfterContentInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() width: string;
  @Input() height: string;
  @Input() appendTo: any;
  @Input() preview: boolean;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
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
  @Input() style: CSSStyleDeclaration;
  @Input() styleClass: string;
  @Input() previewStyle: CSSStyleDeclaration;
  @Input() previewStyleClass: string;
  @Input() imageStyle: CSSStyleDeclaration;
  @Input() imageStyleClass: string;
  @Input() previewImageStyle: CSSStyleDeclaration;
  @Input() previewImageStyleClass: string;
  @Input() errorPlaceholderSrc: string;
  @Output() onShow = new EventEmitter<AnimationEvent>();
  @Output() onHide = new EventEmitter<AnimationEvent>();
  @Output() onImageError = new EventEmitter<Event>();
  @ViewChild('mask') mask: ElementRef;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  indicatorTemplate: TemplateRef<any>;
  maskVisible: boolean = false;
  previewVisible: boolean = false;
  rotate: number = 0;
  previewClick: boolean = false;
  container: HTMLElement;
  wrapper: HTMLElement;

  constructor(private config: ConfigService, private cd: ChangeDetectorRef) {
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'indicator':
          this.indicatorTemplate = item.templateRef;
          break;

        default:
          this.indicatorTemplate = item.templateRef;
          break;
      }
    });
  }

  onImageClick() {
    if (this.preview) {
      this.maskVisible = true;
      this.previewVisible = true;
    }
  }

  onPreviewImageClick() {
    this.previewClick = true;
  }

  rotateRight() {
    this.rotate += 90;
    this.previewClick = true;
  }

  rotateLeft() {
    this.rotate -= 90;
    this.previewClick = true;
  }

  onAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.container = event.element;
        this.wrapper = this.container.parentElement;
        this.appendContainer();
        this.moveOnTop();
        break;

      case 'void':
        PrimeDomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
        break;
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'void':
        PrimeZIndexUtils.clear(this.wrapper);
        this.maskVisible = false;
        this.container = null;
        this.wrapper = null;
        this.cd.markForCheck();
        this.onHide.emit(event);
        break;
      case 'visible':
        this.onShow.emit(event);
        break;
    }
  }

  moveOnTop() {
    PrimeZIndexUtils.set('modal', this.wrapper, this.config.getConfig().zIndex.modal);
  }

  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === 'body') document.body.appendChild(this.wrapper);
      else PrimeDomHandler.appendChild(this.wrapper, this.appendTo);
    }
  }

  imagePreviewStyle() {
    return {transform: 'rotate(' + this.rotate + 'deg)', ...this.previewImageStyle};
  }

  containerClass() {
    return {
      'p-image p-component': true,
      'p-image-preview-container': this.preview
    };
  }

  handleToolbarClick(event: MouseEvent) {
    event.stopPropagation();
  }

  closePreview() {
    this.previewVisible = false;
    this.rotate = 0;
  }

  imageError(event: Event) {
    this.src = this.errorPlaceholderSrc ?? this.src;
    this.onImageError.emit(event);
  }
}

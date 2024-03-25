import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {animate, AnimationEvent, style, transition, trigger} from "@angular/animations";
import {ConfigService} from "@powell/api";
import {NgCssObject, NgDisableZoomControl, NgLimitZoom, NgListener, NgOverflow} from "@powell/models";
import {PrimeDomHandler, PrimeTemplateDirective, PrimeZIndexUtils} from "@powell/primeng/api";
import {SafeUrl} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

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
  @Input() loading: "eager" | "lazy";
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
  @ContentChildren(PrimeTemplateDirective) templates: QueryList<PrimeTemplateDirective>;

  indicatorTemplate: TemplateRef<any> | undefined;
  rotateRightIconTemplate: TemplateRef<any> | undefined;
  rotateLeftIconTemplate: TemplateRef<any> | undefined;
  zoomOutIconTemplate: TemplateRef<any> | undefined;
  zoomInIconTemplate: TemplateRef<any> | undefined;
  closeIconTemplate: TemplateRef<any> | undefined;
  maskVisible: boolean = false;
  previewVisible: boolean = false;
  rotate: number = 0;
  scale: number = 1;
  previewClick: boolean = false;
  container: HTMLElement;
  wrapper: HTMLElement;

  get isZoomOutDisabled(): boolean {
    return this.scale - this.zoomSettings.step <= this.zoomSettings.min;
  }

  get isZoomInDisabled(): boolean {
    return this.scale + this.zoomSettings.step >= this.zoomSettings.max;
  }

  private zoomSettings = {
    default: 1,
    step: 0.1,
    max: 1.5,
    min: 0.5
  };

  constructor(@Inject(DOCUMENT) private document: Document,
              private configService: ConfigService,
              private cd: ChangeDetectorRef, public el: ElementRef) {
  }

  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'indicator':
          this.indicatorTemplate = item.template;
          break;

        case 'rotaterighticon':
          this.rotateRightIconTemplate = item.template;
          break;

        case 'rotatelefticon':
          this.rotateLeftIconTemplate = item.template;
          break;

        case 'zoomouticon':
          this.zoomOutIconTemplate = item.template;
          break;

        case 'zoominicon':
          this.zoomInIconTemplate = item.template;
          break;

        case 'closeicon':
          this.closeIconTemplate = item.template;
          break;

        default:
          this.indicatorTemplate = item.template;
          break;
      }
    });
  }

  onImageClick() {
    if (this.preview) {
      this.maskVisible = true;
      this.previewVisible = true;
      PrimeDomHandler.blockBodyScroll();
    }
  }

  onMaskClick() {
    if (!this.previewClick) {
      this.closePreview();
    }

    this.previewClick = false;
  }

  onMaskKeydown(event) {
    switch (event.code) {
      case 'Escape':
        this.onMaskClick();
        setTimeout(() => {
          PrimeDomHandler.focus(this.previewButton.nativeElement);
        }, 25);
        event.preventDefault();

        break;

      default:
        break;
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

  zoomIn() {
    this.scale = this.scale + this.zoomSettings.step;
    this.previewClick = true;
  }

  zoomOut() {
    this.scale = this.scale - this.zoomSettings.step;
    this.previewClick = true;
  }

  onAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.container = event.element;
        this.wrapper = this.container?.parentElement;
        this.appendContainer();
        this.moveOnTop();

        setTimeout(() => {
          PrimeDomHandler.focus(this.closeButton.nativeElement);
        }, 25);
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
    PrimeZIndexUtils.set('modal', this.wrapper, this.configService.getConfig().zIndex.modal);
  }

  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === 'body') this.document.body.appendChild(this.wrapper as HTMLElement);
      else PrimeDomHandler.appendChild(this.wrapper, this.appendTo);
    }
  }

  imagePreviewStyle() {
    return {transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')'};
  }

  get zoomImageAriaLabel() {
    return this.getTranslation().aria ? this.getTranslation().aria.zoomImage : undefined;
  }

  containerClass() {
    return {
      'p-image p-component': true,
      'p-image-preview-container': this.preview
    };
  }

  handleToolbarClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  closePreview(): void {
    this.previewVisible = false;
    this.rotate = 0;
    this.scale = this.zoomSettings.default;
    PrimeDomHandler.unblockBodyScroll();
  }

  imageError(event: Event) {
    this.onImageError.emit(event);
  }

  rightAriaLabel() {
    return this.getTranslation().aria ? this.getTranslation().aria.rotateRight : undefined;
  }

  leftAriaLabel() {
    return this.getTranslation().aria ? this.getTranslation().aria.rotateLeft : undefined;
  }

  zoomInAriaLabel() {
    return this.getTranslation().aria ? this.getTranslation().aria.zoomIn : undefined;
  }

  zoomOutAriaLabel() {
    return this.getTranslation().aria ? this.getTranslation().aria.zoomOut : undefined;
  }

  closeAriaLabel() {
    return this.getTranslation().aria ? this.getTranslation().aria.close : undefined;
  }

  getTranslation(){
    return this.configService.getConfig().translation;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.previewVisible) {
      this.closePreview();
    }
  }
}

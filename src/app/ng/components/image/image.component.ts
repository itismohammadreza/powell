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
import {ConfigService} from "@ng/services";
import {TemplateDirective} from "@ng/directives/template.directive";
import {SafeUrl} from "@angular/platform-browser";
import {ZIndexUtils} from "primeng/utils";
import {DomHandler} from "primeng/dom";

@Component({
  selector: 'ng-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-element'
  }
})
export class ImageComponent implements AfterContentInit {
  @Input() imageClass: string;
  @Input() imageStyle: any;
  @Input() styleClass: string;
  @Input() style: any;
  @Input() src: string | SafeUrl;
  @Input() alt: string;
  @Input() width: string;
  @Input() height: string;
  @Input() appendTo: any;
  @Input() preview: boolean = false;
  @Input() showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  @Output() onImageError: EventEmitter<any> = new EventEmitter();
  @ViewChild('mask') mask: ElementRef;
  @ContentChildren(TemplateDirective) templates: QueryList<any>;

  indicatorTemplate: TemplateRef<any>;
  maskVisible: boolean = false;
  previewVisible: boolean = false;
  rotate: number = 0;
  scale: number = 1;
  previewClick: boolean = false;
  container: HTMLElement;
  wrapper: HTMLElement;
  zoomSettings = {
    default: 1,
    step: 0.1,
    max: 1.5,
    min: 0.5
  };

  constructor(private config: ConfigService, private cd: ChangeDetectorRef) {
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'indicator':
          this.indicatorTemplate = item.template;
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
    }
  }

  onMaskClick() {
    if (!this.previewClick) {
      this.closePreview();
    }
    this.previewClick = false;
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
        this.wrapper = this.container.parentElement;
        this.appendContainer();
        this.moveOnTop();
        break;

      case 'void':
        DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
        break;
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'void':
        ZIndexUtils.clear(this.wrapper);
        this.maskVisible = false;
        this.container = null;
        this.wrapper = null;
        this.cd.markForCheck();
        this.onHide.emit({});
        break;
      case 'visible':
        this.onShow.emit({});
        break;
    }
  }

  moveOnTop() {
    ZIndexUtils.set('modal', this.wrapper, this.config.getConfig().zIndex.modal);
  }

  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === 'body') document.body.appendChild(this.wrapper);
      else DomHandler.appendChild(this.wrapper, this.appendTo);
    }
  }

  imagePreviewStyle() {
    return {transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')'};
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

  closePreview() {
    this.previewVisible = false;
    this.rotate = 0;
    this.scale = this.zoomSettings.default;
  }

  imageError(event) {
    this.onImageError.emit(event);
  }

  get isZoomOutDisabled() {
    return this.scale - this.zoomSettings.step <= this.zoomSettings.min;
  }

  get isZoomInDisabled() {
    return this.scale + this.zoomSettings.step >= this.zoomSettings.max;
  }

  // @Input() onErrorImagePlaceholder: string;
  // @Output() onError = new EventEmitter();
  //
  // ngOnInit(): void {
  //   this.el.nativeElement.querySelector('img').onerror = (event) => {
  //     event.target.onerror = null;
  //     event.target.src = "assets/images/no-image-placeholder.jpg" || this.onErrorImagePlaceholder;
  //     this.onError.emit(event);
  //   }
  // }
  //
  // emitter(name: string, event: any) {
  //   (this[name] as EventEmitter<any>).emit(event);
  // }
}

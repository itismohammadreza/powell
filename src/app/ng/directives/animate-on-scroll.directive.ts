import {ScrollService} from "@ng/services/scroll.service";
import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2,} from "@angular/core";
import {Subscription} from "rxjs";

type AnimationNames =
  'bounce' |
  'flash' |
  'pulse' |
  'rubberBand' |
  'shake' |
  'headShake' |
  'swing' |
  'tada' |
  'wobble' |
  'jello' |
  'bounceIn' |
  'bounceInDown' |
  'bounceInLeft' |
  'bounceInRight' |
  'bounceInUp' |
  'bounceOut' |
  'bounceOutDown' |
  'bounceOutLeft' |
  'bounceOutRight' |
  'bounceOutUp' |
  'fadeIn' |
  'fadeInDown' |
  'fadeInDownBig' |
  'fadeInLeft' |
  'fadeInLeftBig' |
  'fadeInRight' |
  'fadeInRightBig' |
  'fadeInUp' |
  'fadeInUpBig' |
  'fadeOut' |
  'fadeOutDown' |
  'fadeOutDownBig' |
  'fadeOutLeft' |
  'fadeOutLeftBig' |
  'fadeOutRight' |
  'fadeOutRightBig' |
  'fadeOutUp' |
  'fadeOutUpBig' |
  'flip' |
  'flipInX' |
  'flipInY' |
  'flipOutX' |
  'flipOutY' |
  'lightSpeedIn' |
  'lightSpeedOut' |
  'rotateIn' |
  'rotateInDownLeft' |
  'rotateInDownRight' |
  'rotateInUpLeft' |
  'rotateInUpRight' |
  'rotateOut' |
  'rotateOutDownLeft' |
  'rotateOutDownRight' |
  'rotateOutUpLeft' |
  'rotateOutUpRight' |
  'hinge' |
  'rollIn' |
  'rollOut' |
  'zoomIn' |
  'zoomInDown' |
  'zoomInLeft' |
  'zoomInRight' |
  'zoomInUp' |
  'zoomOut' |
  'zoomOutDown' |
  'zoomOutLeft' |
  'zoomOutRight' |
  'zoomOutUp' |
  'slideInDown' |
  'slideInLeft' |
  'slideInRight' |
  'slideInUp' |
  'slideOutDown' |
  'slideOutLeft' |
  'slideOutRight' |
  'slideOutUp';

@Directive({
  selector: "[ngAnimateOnScroll]",
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy, AfterViewInit {
  private offsetTop: number;
  private isVisible: boolean;
  private winHeight: number;
  private scrollSub: Subscription = new Subscription();
  private resizeSub: Subscription = new Subscription();

  @Input('ngAnimateOnScroll') animationName: AnimationNames;
  @Input() offset: number = 80;
  @Input() useScroll: boolean;
  @Input() threshold: number;
  @Input() hideOnInit: boolean = true;
  @Input() delay: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private scroll: ScrollService
  ) {
  }

  ngOnInit(): void {
    if (!this.animationName) {
      return;
    }
    if (this.hideOnInit) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden')
    }
    if (this.delay) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'animation-delay', this.delay)
    }
    this.isVisible = false;
    this.useScroll = this.useScroll ? this.useScroll : this.useScroll === false;
    this.threshold = this.threshold ? this.threshold || 0.5 : 0.5;
    if ("IntersectionObserver" in window && this.useScroll) {
      const options: IntersectionObserverInit = {
        root: null,
        threshold: this.threshold,
        rootMargin: "0px",
      };
      const observer: IntersectionObserver = new IntersectionObserver(
        (entries, _) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            this.addAnimationClass();
          });
        },
        options
      );
      observer.observe(this.elementRef.nativeElement);
      return;
    }

    this.scrollSub = this.scroll.scrollObs.subscribe(() =>
      this.manageVisibility()
    );

    this.resizeSub = this.scroll.resizeObs.subscribe(() =>
      this.manageVisibility()
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.manageVisibility(), 1);
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
    this.resizeSub.unsubscribe();
  }

  private manageVisibility(): void {
    if (this.isVisible) {
      return;
    }
    this.getWinHeight();
    this.getOffsetTop();
    const scrollTrigger = this.offsetTop + this.offset - this.winHeight;
    if (this.scroll.pos >= scrollTrigger) {
      this.addAnimationClass();
    }
  }

  private addAnimationClass(): void {
    if (!this.animationName) {
      return;
    }
    this.isVisible = true;
    this.setClass('animated')
    this.setClass(this.animationName);
  }

  private setClass(className: string): void {
    this.renderer.addClass(this.elementRef.nativeElement, className);
  }

  private getWinHeight(): void {
    this.winHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  }

  private getOffsetTop(): void {
    if (
      typeof this.elementRef.nativeElement.getBoundingClientRect === "function"
    ) {
      const viewportTop = this.elementRef.nativeElement.getBoundingClientRect().top;
      const clientTop = this.elementRef.nativeElement.clientTop;
      this.offsetTop = viewportTop + this.scroll.pos - clientTop;
    } else {
      this.offsetTop = 0;
    }
  }
}

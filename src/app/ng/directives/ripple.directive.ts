import {AfterViewInit, Directive, ElementRef, NgZone, OnDestroy,} from '@angular/core';
import {DomHandler} from '@ng/services';

/*
.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-ink {
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    transform: scale(0);
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

.p-ripple-disabled .p-ink {
    display: none !important;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
*/
@Directive({
  selector: '[ngRipple]',
  host: {
    '[class.p-ripple]': 'true',
  },
})
export class RippleDirective implements AfterViewInit, OnDestroy {
  animationListener: any;
  mouseDownListener: any;

  constructor(public el: ElementRef, public zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.create();
      this.mouseDownListener = this.onMouseDown.bind(this);
      this.el.nativeElement.addEventListener(
        'mousedown',
        this.mouseDownListener
      );
    });
  }

  onMouseDown(event: MouseEvent) {
    let ink = this.getInk();
    if (!ink || getComputedStyle(ink, null).display === 'none') {
      return;
    }

    DomHandler.removeClass(ink, 'p-ink-active');
    if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
      let d = Math.max(
        DomHandler.getOuterWidth(this.el.nativeElement),
        DomHandler.getOuterHeight(this.el.nativeElement)
      );
      ink.style.height = d + 'px';
      ink.style.width = d + 'px';
    }

    let offset = DomHandler.getOffset(this.el.nativeElement);
    let x =
      event.pageX -
      offset.left +
      document.body.scrollTop -
      DomHandler.getWidth(ink) / 2;
    let y =
      event.pageY -
      offset.top +
      document.body.scrollLeft -
      DomHandler.getHeight(ink) / 2;

    ink.style.top = y + 'px';
    ink.style.left = x + 'px';
    DomHandler.addClass(ink, 'p-ink-active');
  }

  getInk() {
    for (let i = 0; i < this.el.nativeElement.children.length; i++) {
      if (this.el.nativeElement.children[i].className.indexOf('p-ink') !== -1) {
        return this.el.nativeElement.children[i];
      }
    }
    return null;
  }

  resetInk() {
    let ink = this.getInk();
    if (ink) {
      DomHandler.removeClass(ink, 'p-ink-active');
    }
  }

  onAnimationEnd(event) {
    DomHandler.removeClass(event.currentTarget, 'p-ink-active');
  }

  create() {
    let ink = document.createElement('span');
    ink.className = 'p-ink';
    this.el.nativeElement.appendChild(ink);

    this.animationListener = this.onAnimationEnd.bind(this);
    ink.addEventListener('animationend', this.animationListener);
  }

  remove() {
    let ink = this.getInk();
    if (ink) {
      this.el.nativeElement.removeEventListener(
        'mousedown',
        this.mouseDownListener
      );
      ink.removeEventListener('animationend', this.animationListener);
      DomHandler.removeElement(ink);
    }
  }

  ngOnDestroy() {
    this.remove();
  }
}

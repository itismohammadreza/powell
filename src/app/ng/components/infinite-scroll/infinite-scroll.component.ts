import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'ng-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', {static: true}) anchor: ElementRef<HTMLElement>;

  observer: IntersectionObserver;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, {
      root: this.isHostScrollable() ? this.el.nativeElement : null
    });

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.el.nativeElement);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}

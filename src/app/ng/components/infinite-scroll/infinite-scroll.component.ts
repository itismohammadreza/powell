import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'ng-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements AfterContentInit, OnDestroy {

  @Input() spinnerWidth: string = '40px';
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', {static: true}) anchor: ElementRef<HTMLElement>;

  observer: IntersectionObserver;
  loading: boolean;

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.showLoading()
        this.scrolled.emit(this.hideLoading);
      }
    }, {
      root: this.isHostScrollable() ? this.el.nativeElement : null
    });
    this.observer.observe(this.anchor.nativeElement);
  }

  showLoading = () => {
    this.loading = true;
  }

  hideLoading = () => {
    this.loading = false
  }

  isHostScrollable() {
    const style = window.getComputedStyle(this.el.nativeElement);
    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}

import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements AfterContentInit, OnDestroy {
  @Input() data: any[];
  @Input() spinnerWidth: string = '40px';
  @Output() scrolled = new EventEmitter<Function>();
  @ViewChild('anchor', {static: true}) anchor: ElementRef<HTMLElement>;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  loading: boolean;
  templateMap: Record<string, TemplateRef<any>> = {};
  observer: IntersectionObserver;

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
    this.observer = new IntersectionObserver(([entry]) => {
      if (this.loading) {
        return;
      }
      if (entry.isIntersecting) {
        this.showLoading()
        this.scrolled.emit(this.hideLoading);
      }
    }, {
      root: this.isHostScrollable() ? this.el.nativeElement : null,
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

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
import {TemplateDirective} from "@ng/directives/template";

@Component({
  selector: 'ng-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements AfterContentInit, OnDestroy {
  @Input() data: any[];
  @Input() spinnerWidth: string = '40px';
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', {static: true}) anchor: ElementRef<HTMLElement>;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  contentTemplate: TemplateRef<any>;
  loadingTemplate: TemplateRef<any>;
  observer: IntersectionObserver;
  loading: boolean;

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.templateRef;
          break;

        case 'loading':
          this.loadingTemplate = item.templateRef;
          break;
      }
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

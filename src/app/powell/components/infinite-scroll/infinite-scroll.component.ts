import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";
import {CssObject} from "@powell/models";

@Component({
  selector: 'pw-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  standalone: false
})
export class InfiniteScrollComponent implements AfterContentInit, OnDestroy {
  private el = inject(ElementRef);

  @Input() data: Optional<any[]>;
  @Input() style: Optional<CssObject>;
  @Input() spinnerWidth: string = '40px';
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', {static: true}) anchor!: ElementRef<HTMLElement>;
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  loading: boolean = false;
  templateMap: Record<string, TemplateRef<any>> = {};
  observer!: IntersectionObserver;

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
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

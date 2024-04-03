import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {BehaviorSubject, takeUntil} from 'rxjs';
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {PrimeBreadcrumbItemClickEvent, PrimeMenuItem} from "@powell/primeng/api";
import {NgCssObject} from "@powell/models";
import {DestroyService} from "@core/utils";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit, AfterContentInit {
  @Input() items: PrimeMenuItem[];
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() home: PrimeMenuItem;
  @Input() homeAriaLabel: string;
  @Input() rtl: boolean;
  @Output() onItemClick = new EventEmitter<PrimeBreadcrumbItemClickEvent>();
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  _breadcrumbs$ = new BehaviorSubject<PrimeMenuItem[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();
  templateMap: Record<string, TemplateRef<any>> = {};

  constructor(private router: Router, private destroy$: DestroyService) {
  }

  ngOnInit() {
    if (this.items) {
      this._breadcrumbs$.next(this.items);
      return;
    }
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: PrimeMenuItem[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: PrimeMenuItem[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if (route.data.breadcrumb) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          routerLink: '/' + routeUrl.join('/')
        };
        breadcrumbs.push(breadcrumb);
      }
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  getLabel(data: Data) {
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
  }

  _onItemClick(event: PrimeBreadcrumbItemClickEvent) {
    this.onItemClick.emit(event)
  }
}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {PrimeBreadcrumbItemClickEvent, PrimeMenuItem} from "@powell/primeng/api";
import {CSSStyleDeclaration} from "@powell/models";

@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() style: CSSStyleDeclaration;
  @Input() styleClass: string;
  @Input() home: PrimeMenuItem;
  @Input() rtl: boolean;
  @Output() onItemClick = new EventEmitter<PrimeBreadcrumbItemClickEvent>();

  _breadcrumbs$ = new BehaviorSubject<PrimeMenuItem[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: PrimeMenuItem[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
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

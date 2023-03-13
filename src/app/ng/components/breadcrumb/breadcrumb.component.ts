import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from "rxjs/operators";

@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<any[]>;
  breadcrumbSubject = new BehaviorSubject<any[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: any[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this.breadcrumbSubject.next(breadcrumbs);
      this.breadcrumbs$ = this.breadcrumbSubject.asObservable();
    });
  }

  addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: any[]) {
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
}

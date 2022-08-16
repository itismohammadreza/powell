import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<any[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: any[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: any[]) {
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

  private getLabel(data: Data) {
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
  }
}

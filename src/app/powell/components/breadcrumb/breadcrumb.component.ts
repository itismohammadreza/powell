import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {BehaviorSubject, takeUntil} from 'rxjs';
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {$BreadcrumbItemClickEvent, $MenuItem} from "@powell/primeng";
import {DestroyService} from "@powell/utils";
import {TemplateDirective} from "@powell/directives/template";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  standalone: false
})
export class BreadcrumbComponent implements OnInit, AfterContentInit {
  private router = inject(Router);
  private destroy$ = inject(DestroyService);
  private configService = inject(ConfigService);

  @Input() rtl: Optional<boolean>;
  @Input() followConfig: Optional<boolean>;
  // native properties
  @Input() items: Optional<$MenuItem[]>;
  @Input() home: Optional<$MenuItem>;
  @Input() homeAriaLabel: Optional<string>;
  @Output() onItemClick = new EventEmitter<$BreadcrumbItemClickEvent>();
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  _breadcrumbs$ = new BehaviorSubject<$MenuItem[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();
  templateMap: Record<string, TemplateRef<SafeAny>> = {};

  ngOnInit() {
    if (this.items) {
      this._breadcrumbs$.next(this.items);
      return;
    }
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: $MenuItem[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
    this.configService.configureComponent(this);
  }

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  addBreadcrumb(route: Nullable<ActivatedRouteSnapshot>, parentUrl: string[], breadcrumbs: $MenuItem[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if (route.data['breadcrumb']) {
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
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }

  _onItemClick(event: $BreadcrumbItemClickEvent) {
    this.onItemClick.emit(event)
  }
}

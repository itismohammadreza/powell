import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {BreadcrumbService} from '@ng/services/breadcrumb.service';

@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<any[]>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
}

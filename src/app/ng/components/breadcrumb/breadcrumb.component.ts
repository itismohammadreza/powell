import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreadcrumbService} from '@ng/services/breadcrumb.service';

class NgBreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$: Observable<any[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit() {
  }
}

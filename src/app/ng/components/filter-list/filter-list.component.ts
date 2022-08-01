import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {NgSize} from '@ng/models/offset';

@Component({
  selector: 'ng-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent {
  @Input() inputPlaceholder: string = '';
  @Input() rtl: boolean = false;
  @Input() inputLabel: string;
  @Input() inputSize: NgSize = 'md';
  @Input() list: any[];
  @Input() searchField: string;
  @Input() emptyMessage: string = 'موردی یافت نشد';
  @ContentChild(TemplateRef)
  layoutTemplate: TemplateRef<any>;

  query: string;
}

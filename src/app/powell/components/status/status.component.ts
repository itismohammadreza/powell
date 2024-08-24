import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {NgStatusIcon} from "@powell/models";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements AfterContentInit {
  @Input() status: NgStatusIcon = "success";
  @Input() text: string;
  @Input() subText: string;
  @Input() rtl: boolean;
  @Input() followConfig: boolean;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Record<string, TemplateRef<any>> = {};

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }
}

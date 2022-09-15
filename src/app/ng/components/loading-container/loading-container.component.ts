import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {TemplateDirective} from "@ng/directives/template.directive";

@Component({
  selector: 'ng-loading-container',
  templateUrl: './loading-container.component.html',
  styleUrls: ['./loading-container.component.scss']
})
export class LoadingContainerComponent implements AfterContentInit {
  constructor() {
  }

  @Input() data: any;
  @Input() spinnerStrokeWidth: number = 4;
  @Input() spinnerFill: string = 'var(--surface-ground)';
  @Input() spinnerWidth: string = '70px';
  @Input() spinnerHeight: string = '70px';
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  contentTemplate: TemplateRef<any>;
  loadingTemplate: TemplateRef<any>;

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.templateRef;
          break;
        case 'loading':
          this.loadingTemplate = item.templateRef;
          break;
      }
    });
  }

  dataFilled() {
    return !!this.data === true;
  }
}

import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-loading-container',
  templateUrl: './loading-container.component.html',
  standalone: false
})
export class LoadingContainerComponent implements AfterContentInit {
  @Input() data: any;
  @Input() considerEmptyArrayAsFilled: boolean = true;
  @Input() considerEmptyObjectAsFilled: boolean = true;
  @Input() spinnerStrokeWidth: number = 4;
  @Input() spinnerFill: string;
  @Input() spinnerWidth: string = '70px';
  @Input() spinnerHeight: string = '70px';
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Record<string, TemplateRef<any>> = {};

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  get isEmptyData() {
    const isEmpty = (data: any) => {
      const stringifyData = JSON.stringify(data);
      if (data == undefined && data == null) {
        return true;
      } else if (typeof data == 'string') {
        if (data == '' || !data?.length || data.trim() == '') {
          return true;
        }
      } else if (Array.isArray(data)) {
        if ((!data?.length || stringifyData == "[]") && !this.considerEmptyArrayAsFilled) {
          return true;
        }
      } else if (typeof data == 'object') {
        if (stringifyData == "{}" && !this.considerEmptyObjectAsFilled) {
          return true;
        }
      } else {
        return false;
      }
    }
    if (typeof this.data === 'function') {
      return isEmpty(this.data());
    } else {
      return isEmpty(this.data);
    }
  }
}

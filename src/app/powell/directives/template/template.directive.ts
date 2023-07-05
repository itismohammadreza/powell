import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ngTemplate]'
})
export class TemplateDirective {
  @Input('ngTemplate') templateName: string;

  constructor(public templateRef: TemplateRef<any>) {
  }

  getType() {
    return this.templateName;
  }
}

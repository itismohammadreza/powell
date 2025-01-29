import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ngTemplate]',
  standalone: false
})
export class TemplateDirective {
  @Input('ngTemplate') templateName: string;

  constructor(public templateRef: TemplateRef<any>) {
  }

  get type() {
    return this.templateName;
  }
}

import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[pwTemplate]',
  standalone: false
})
export class TemplateDirective {
  @Input('pwTemplate') templateName: string = '';

  constructor(public templateRef: TemplateRef<SafeAny>) {
  }

  get type() {
    return this.templateName;
  }
}

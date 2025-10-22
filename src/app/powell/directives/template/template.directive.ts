import {Directive, inject, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[pwTemplate]',
  standalone: false
})
export class TemplateDirective {
  public templateRef = inject(TemplateRef);

  @Input('pwTemplate') templateName: string = '';

  get type() {
    return this.templateName;
  }
}

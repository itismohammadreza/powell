import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {NgElementAdditionTemplate, NgLabelPosition} from "@powell/models";
import {TemplateDirective} from "@powell/directives/template";

@Component({
  selector: 'ng-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements AfterContentInit {
  @Input() label: string;
  @Input() inputId: string;
  @Input() labelWidth: number;
  @Input() disabled: boolean;
  @Input() labelPosition: NgLabelPosition;
  @Input() fluid: boolean;
  @Input() reverseLabel: boolean;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  templateMap: Partial<Record<NgElementAdditionTemplate, TemplateRef<any>>> = {};

  ngAfterContentInit() {
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });

    const hasAddon = this.templateMap.addonStart || this.templateMap.addonEnd;
    const hasIcon = this.templateMap.iconStart || this.templateMap.iconEnd;

    if (hasAddon && hasIcon) {
      console.warn('Both icon and addon detected. Priority is with the addon');
    }
  }
}

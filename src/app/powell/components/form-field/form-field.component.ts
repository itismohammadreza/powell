import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {NgElementAdditionTemplate, NgLabelPosition, NgValidation} from "@powell/models";
import {TemplateDirective} from "@powell/directives/template";
import {NgControl} from "@angular/forms";

@Component({
  selector: 'ng-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements AfterContentInit {
  @Input() ngControl: NgControl;
  @Input() validation: NgValidation;
  @Input() hint: string;
  @Input() label: string;
  @Input() inputId: string;
  @Input() labelWidth: number;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
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

  isInvalid = () => {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && !this.readonly && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string) {
    return this.isInvalid() && this.ngControl.control.hasError(type);
  }

  showHint() {
    let hasError = false;
    for (const errorKey in this.validation) {
      if (this.hasError(errorKey)) {
        hasError = true;
      }
    }
    return !hasError;
  }
}

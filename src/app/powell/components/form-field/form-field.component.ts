import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import {ElementAdditionTemplate, LabelPosition, Validation} from "@powell/models";
import {TemplateDirective} from "@powell/directives/template";
import {NgControl} from "@angular/forms";
import {$uuid} from '@powell/primeng';

@Component({
  selector: 'pw-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements AfterContentInit {
  @Input() ngControl: Nullable<NgControl> = null;
  @Input() validation: Optional<Validation>;
  @Input() hint: Optional<string>;
  @Input() label: Optional<string>;
  @Input() inputId: string = $uuid();
  @Input() labelWidth: Optional<number>;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() labelPosition: Optional<LabelPosition>;
  @Input() fluid: boolean = false;
  @Input() reverseLabel: boolean = false;
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  templateMap: Partial<Record<ElementAdditionTemplate, TemplateRef<SafeAny>>> = {};

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type as ElementAdditionTemplate;
      this.templateMap[name] = item.templateRef;
    });

    const hasAddon = this.templateMap.addonStart || this.templateMap.addonEnd;
    const hasIcon = this.templateMap.iconStart || this.templateMap.iconEnd;

    if (hasAddon && hasIcon) {
      console.warn('Both icon and addon detected. Priority is with the addon');
    }
  }

  get isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control!;
      return (!this.disabled && !this.readonly && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string) {
    return this.isInvalid && this.ngControl?.control?.hasError(type);
  }

  get showHint() {
    let hasError = false;
    for (const errorKey in this.validation) {
      if (this.hasError(errorKey)) {
        hasError = true;
      }
    }
    return !hasError;
  }
}

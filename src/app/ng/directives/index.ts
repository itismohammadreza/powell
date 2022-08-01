import {Type} from '@angular/core';
import {AddonDirective} from './addon.directive';
import {ClickOutsideDirective} from './click-outside.directive';
import {NumberOnlyDirective} from './number-only.directive';
import {RippleDirective} from './ripple.directive';
import {DynamicFormDirective} from './dynamic-form.directive';
import {TemplateDirective} from '@ng/directives/template.directive';

export const DIRECTIVES: Type<any>[] = [
  AddonDirective,
  NumberOnlyDirective,
  ClickOutsideDirective,
  DynamicFormDirective,
  RippleDirective,
  TemplateDirective
];

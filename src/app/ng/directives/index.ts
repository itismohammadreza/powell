import {Type} from '@angular/core';
import {AddonDirective} from './addon.directive';
import {ClickOutsideDirective} from './click-outside.directive';
import {NumberOnlyDirective} from './number-only.directive';
import {TemplateDirective} from './template.directive';
import {ConfigHandlerDirective} from "./config-handler.directive";

export const DIRECTIVES: Type<any>[] = [
  AddonDirective,
  NumberOnlyDirective,
  ClickOutsideDirective,
  TemplateDirective,
  ConfigHandlerDirective
];

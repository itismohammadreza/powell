import {Type} from '@angular/core';
import {LogoComponent} from './components/logo/logo.component';
import {PermissionDirective} from "@shared/directives/permission.directive";

export const COMPONENTS: Type<any>[] = [
  LogoComponent,
  PermissionDirective
];

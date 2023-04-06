import {Type} from '@angular/core';
import {PermissionDirective} from "@shared/directives/permission.directive";
import {CommonModule} from "@angular/common";

export const DECLARATIONS: Type<any>[] = [
  PermissionDirective
];

export const IMPORTS: Type<any>[] = [
  CommonModule
];

export const EXPORTS: Type<any>[] = [
  ...DECLARATIONS
];

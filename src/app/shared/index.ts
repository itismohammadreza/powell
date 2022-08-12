import {Type} from '@angular/core';
import {LogoComponent} from './components/logo/logo.component';
import {NavbarMenuComponent} from './components/navbar-menu/navbar-menu.component';
import {PageContainerComponent} from './components/page-container/page-container.component';
import {PermissionDirective} from "@shared/directives/permission.directive";

export const COMPONENTS: Type<any>[] = [
  LogoComponent,
  NavbarMenuComponent,
  PageContainerComponent,
  PermissionDirective
];

import {Type} from '@angular/core';
import {MainPage} from "@modules/main/main.page";
import {MainRoutingModule} from "@modules/main/main-routing.module";
import {$ScrollTopModule} from "@powell/primeng";
import {LoadingComponent} from "@modules/layout/loading/loading.component";
import {LogoComponent} from "@modules/layout/logo/logo.component";
import {NavbarMenuComponent} from "@modules/layout/navbar-menu/navbar-menu.component";

export const DECLARATIONS: Type<SafeAny>[] = [
  MainPage,
];

export const IMPORTS: Type<SafeAny>[] = [
  LoadingComponent,
  LogoComponent,
  NavbarMenuComponent,
  MainRoutingModule,
  $ScrollTopModule,
];

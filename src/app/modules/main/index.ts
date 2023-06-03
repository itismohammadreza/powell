import {Type} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MainPage} from "@modules/main/main.page";
import {MainRoutingModule} from "@modules/main/main-routing.module";
import {PrimeScrollTopModule} from "@powell/primeng";
import {LoadingComponent} from "@modules/layout/loading/loading.component";
import {LogoComponent} from "@modules/layout/logo/logo.component";
import {NavbarMenuComponent} from "@modules/layout/navbar-menu/navbar-menu.component";

export const DECLARATIONS: Type<any>[] = [
  MainPage,
];

export const IMPORTS: Type<any>[] = [
  CommonModule,
  LoadingComponent,
  LogoComponent,
  NavbarMenuComponent,
  MainRoutingModule,
  PrimeScrollTopModule,
];

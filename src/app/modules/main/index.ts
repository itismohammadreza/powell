import {Type} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MainPage} from "@modules/main/main.page";
import {NavbarMenuComponent} from "@modules/main/components/navbar-menu/navbar-menu.component";
import {MainRoutingModule} from "@modules/main/main-routing.module";
import {LayoutModule} from "@modules/layout/layout.module";
import {ButtonModule} from "@powell/components/button";
import {InputTextModule} from "@powell/components/input-text";
import {DropdownModule} from "@powell/components/dropdown";
import {SwitchModule} from "@powell/components/switch";
import {FilterModule} from "@powell/pipes/filter";
import {
  PrimeAvatarModule,
  PrimeDividerModule,
  PrimeMenubarModule,
  PrimeMenuModule,
  PrimePanelMenuModule,
  PrimeScrollTopModule,
  PrimeSidebarModule
} from "@powell/primeng";

export const DECLARATIONS: Type<any>[] = [
  MainPage,
  NavbarMenuComponent
];

export const IMPORTS: Type<any>[] = [
  CommonModule,
  MainRoutingModule,
  PrimeAvatarModule,
  PrimeMenubarModule,
  PrimeSidebarModule,
  PrimePanelMenuModule,
  PrimeMenuModule,
  PrimeDividerModule,
  PrimeScrollTopModule,
  LayoutModule,
  ButtonModule,
  InputTextModule,
  DropdownModule,
  SwitchModule,
  FilterModule,
  FormsModule,
  TranslateModule,
];

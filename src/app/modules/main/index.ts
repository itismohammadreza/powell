import {Type} from '@angular/core';
import {MainPage} from "@modules/main/main.page";
import {NavbarMenuComponent} from "@modules/main/components/navbar-menu/navbar-menu.component";
import {MainRoutingModule} from "@modules/main/main-routing.module";
import {LayoutModule} from "@modules/layout/layout.module";
import {ButtonModule} from "@ng/components/button";
import {
  PrimeAvatarModule,
  PrimeDividerModule,
  PrimeMenuBarModule,
  PrimeMenuModule,
  PrimePanelMenuModule,
  PrimeScrollTopModule,
  PrimeSidebarModule
} from "@ng/primeng";
import {InputTextModule} from "@ng/components/input-text";
import {DropdownModule} from "@ng/components/dropdown";
import {SwitchModule} from "@ng/components/switch";
import {FilterModule} from "@ng/pipes/filter";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

export const DECLARATIONS: Type<any>[] = [
  MainPage,
  NavbarMenuComponent
];

export const IMPORTS: Type<any>[] = [
  CommonModule,
  MainRoutingModule,
  PrimeAvatarModule,
  PrimeMenuBarModule,
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

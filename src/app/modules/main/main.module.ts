import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {COMPONENTS} from ".";
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

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    MainRoutingModule,
    LayoutModule,
    ButtonModule,
    PrimeAvatarModule,
    PrimeMenuBarModule,
    PrimeSidebarModule,
    InputTextModule,
    PrimePanelMenuModule,
    PrimeMenuModule,
    PrimeDividerModule,
    DropdownModule,
    SwitchModule,
    PrimeScrollTopModule,
    FilterModule,
    FormsModule,
    TranslateModule,
    CommonModule
  ],
})
export class MainModule {
}

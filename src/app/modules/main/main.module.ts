import {NgModule} from '@angular/core';
// import {SharedModule} from '@shared/shared.module';
import {MainRoutingModule} from './main-routing.module';
import {COMPONENTS} from ".";
import {ScrollTopModule} from "primeng/scrolltop";
import {LayoutModule} from "@modules/layout/layout.module";

@NgModule({
  declarations: [...COMPONENTS],
  imports: [MainRoutingModule, ScrollTopModule, LayoutModule],
})
export class MainModule {
}

import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {COMPONENTS} from ".";
import {ScrollTopModule} from "primeng/scrolltop";
import {LayoutModule} from "@modules/layout/layout.module";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    MainRoutingModule,
    ScrollTopModule,
    LayoutModule,
    SharedModule
  ],
})
export class MainModule {
}

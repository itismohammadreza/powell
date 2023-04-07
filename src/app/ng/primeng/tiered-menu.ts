import {NgModule} from '@angular/core';
import {TieredMenu, TieredMenuModule} from "primeng/tieredmenu";

@NgModule({
  exports: [TieredMenuModule]
})
export class PrimeTieredMenuModule {
}

export const PrimeTieredMenu = TieredMenu;

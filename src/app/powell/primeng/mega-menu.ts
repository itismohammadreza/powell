import {NgModule} from '@angular/core';
import {MegaMenu, MegaMenuModule} from "primeng/megamenu";

@NgModule({
  exports: [MegaMenuModule]
})
export class PrimeMegaMenuModule {
}

export const PrimeMegaMenu = MegaMenu;
export type PrimeMegaMenu = MegaMenu;

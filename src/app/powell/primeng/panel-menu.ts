import {NgModule} from '@angular/core';
import {PanelMenu, PanelMenuModule} from "primeng/panelmenu";

@NgModule({
  exports: [PanelMenuModule]
})
export class PrimePanelMenuModule {
}

export const PrimePanelMenu = PanelMenu;
export type PrimePanelMenu = PanelMenu;

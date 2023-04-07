import {NgModule} from '@angular/core';
import {ContextMenu, ContextMenuModule} from "primeng/contextmenu";

@NgModule({
  exports: [ContextMenuModule]
})
export class PrimeContextMenuModule {
}

export const PrimeContextMenu = ContextMenu;

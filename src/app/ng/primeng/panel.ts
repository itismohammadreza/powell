import {NgModule} from '@angular/core';
import {Panel, PanelModule} from "primeng/panel";

@NgModule({
  exports: [PanelModule]
})
export class PrimePanelModule {
}

export const PrimePanel = Panel;

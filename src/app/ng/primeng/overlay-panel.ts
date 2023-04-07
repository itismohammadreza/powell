import {NgModule} from '@angular/core';
import {OverlayPanel, OverlayPanelModule} from "primeng/overlaypanel";

@NgModule({
  exports: [OverlayPanelModule]
})
export class PrimeOverlayPanelModule {
}

export const PrimeOverlayPanel = OverlayPanel;

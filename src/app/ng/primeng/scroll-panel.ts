import {NgModule} from '@angular/core';
import {ScrollPanel, ScrollPanelModule} from "primeng/scrollpanel";

@NgModule({
  exports: [ScrollPanelModule]
})
export class PrimeScrollPanelModule {
}

export const PrimeScrollPanel = ScrollPanel;
export type PrimeScrollPanel = ScrollPanel;

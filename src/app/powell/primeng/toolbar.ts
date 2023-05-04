import {NgModule} from '@angular/core';
import {Toolbar, ToolbarModule} from "primeng/toolbar";

@NgModule({
  exports: [ToolbarModule]
})
export class PrimeToolbarModule {
}

export const PrimeToolbar = Toolbar;
export type PrimeToolbar = Toolbar;

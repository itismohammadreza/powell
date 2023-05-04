import {NgModule} from '@angular/core';
import {TabView, TabViewModule} from "primeng/tabview";

@NgModule({
  exports: [TabViewModule]
})
export class PrimeTabViewModule {
}

export const PrimeTabView = TabView;
export type PrimeTabView = TabView;

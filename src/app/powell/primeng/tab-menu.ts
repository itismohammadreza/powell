import {NgModule} from '@angular/core';
import {TabMenu, TabMenuModule} from "primeng/tabmenu";

@NgModule({
  exports: [TabMenuModule]
})
export class PrimeTabMenuModule {
}

export const PrimeTabMenu = TabMenu;
export type PrimeTabMenu = TabMenu;

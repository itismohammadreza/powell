import {NgModule} from '@angular/core';
import {Menu, MenuModule} from "primeng/menu";

@NgModule({
  exports: [MenuModule]
})
export class PrimeMenuModule {
}

export const PrimeMenu = Menu;
export type PrimeMenu = Menu;

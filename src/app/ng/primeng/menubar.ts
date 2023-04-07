import {NgModule} from '@angular/core';
import {Menubar, MenubarModule} from "primeng/menubar";

@NgModule({
  exports: [MenubarModule]
})
export class PrimeMenubarModule {
}

export const PrimeMenubar = Menubar;

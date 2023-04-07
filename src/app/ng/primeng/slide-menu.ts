import {NgModule} from '@angular/core';
import {SlideMenu, SlideMenuModule} from "primeng/slidemenu";

@NgModule({
  exports: [SlideMenuModule]
})
export class PrimeSlideMenuModule {
}

export const PrimeSlideMenu = SlideMenu;

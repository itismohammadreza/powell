import {NgModule} from '@angular/core';
import {ScrollTop, ScrollTopModule} from "primeng/scrolltop";

@NgModule({
  exports: [ScrollTopModule]
})
export class PrimeScrollTopModule {
}

export const PrimeScrollTop = ScrollTop;

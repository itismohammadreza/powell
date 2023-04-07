import {NgModule} from '@angular/core';
import {Scroller, ScrollerModule} from "primeng/scroller";

@NgModule({
  exports: [ScrollerModule]
})
export class PrimeScrollerModule {
}

export const PrimeScroller = Scroller;

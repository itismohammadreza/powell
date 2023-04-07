import {NgModule} from '@angular/core';
import {VirtualScroller, VirtualScrollerModule} from "primeng/virtualscroller";

@NgModule({
  exports: [VirtualScrollerModule]
})
export class PrimeVirtualScrollerModule {
}

export const PrimeVirtualScroller = VirtualScroller;

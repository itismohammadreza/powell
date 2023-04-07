import {NgModule} from '@angular/core';
import {DeferModule, DeferredLoader} from "primeng/defer";

@NgModule({
  exports: [DeferModule]
})
export class PrimeDeferModule {
}

export const PrimeDefer = DeferredLoader

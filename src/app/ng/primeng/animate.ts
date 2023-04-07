import {NgModule} from '@angular/core';
import {Animate, AnimateModule} from "primeng/animate";

@NgModule({
  exports: [AnimateModule]
})
export class PrimeAnimateModule {
}

export const PrimeAnimate = Animate;
export type PrimeAnimate = Animate;

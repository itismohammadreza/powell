import {NgModule} from '@angular/core';
import {Ripple, RippleModule} from "primeng/ripple";

@NgModule({
  exports: [RippleModule]
})
export class PrimeRippleModule {
}

export const PrimeRipple = Ripple;

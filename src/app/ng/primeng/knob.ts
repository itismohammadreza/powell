import {NgModule} from '@angular/core';
import {Knob, KnobModule} from "primeng/knob";

@NgModule({
  exports: [KnobModule]
})
export class PrimeKnobModule {
}

export const PrimeKnob = Knob;

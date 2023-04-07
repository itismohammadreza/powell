import {NgModule} from '@angular/core';
import {Chips, ChipsModule} from "primeng/chips";

@NgModule({
  exports: [ChipsModule]
})
export class PrimeChipsModule {
}

export const PrimeChips = Chips;

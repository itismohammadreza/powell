import {NgModule} from '@angular/core';
import {Chip, ChipModule} from "primeng/chip";

@NgModule({
  exports: [ChipModule]
})
export class PrimeChipModule {
}

export const PrimeChip = Chip;

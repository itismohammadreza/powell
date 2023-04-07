import {NgModule} from '@angular/core';
import {KeyFilter, KeyFilterModule} from "primeng/keyfilter";

@NgModule({
  exports: [KeyFilterModule]
})
export class PrimeKeyFilterModule {
}

export const PrimeKeyFilter = KeyFilter;

import {NgModule} from '@angular/core';
import {ProgressSpinner, ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  exports: [ProgressSpinnerModule]
})
export class PrimeProgressSpinnerModule {
}

export const PrimeProgressSpinner = ProgressSpinner

import {NgModule} from '@angular/core';
import {ProgressBar, ProgressBarModule} from "primeng/progressbar";

@NgModule({
  exports: [ProgressBarModule]
})
export class PrimeProgressBarModule {
}

export const PrimeProgressBar = ProgressBar;
export type PrimeProgressBar = ProgressBar;

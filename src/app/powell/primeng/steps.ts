import {NgModule} from '@angular/core';
import {Steps, StepsModule} from "primeng/steps";

@NgModule({
  exports: [StepsModule]
})
export class PrimeStepsModule {
}

export const PrimeSteps = Steps;
export type PrimeSteps = Steps;

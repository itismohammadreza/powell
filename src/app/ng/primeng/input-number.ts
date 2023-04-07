import {NgModule} from '@angular/core';
import {InputNumber, InputNumberModule} from "primeng/inputnumber";

@NgModule({
  exports: [InputNumberModule]
})
export class PrimeInputNumberModule {
}

export const PrimeInputNumber = InputNumber;
export type PrimeInputNumber = InputNumber;

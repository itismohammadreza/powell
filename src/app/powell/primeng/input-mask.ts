import {NgModule} from '@angular/core';
import {InputMask, InputMaskModule} from "primeng/inputmask";

@NgModule({
  exports: [InputMaskModule]
})
export class PrimeInputMaskModule {
}

export const PrimeInputMask = InputMask;
export type PrimeInputMask = InputMask;

import {NgModule} from '@angular/core';
import {InputText, InputTextModule} from "primeng/inputtext";

@NgModule({
  exports: [InputTextModule]
})
export class PrimeInputTextModule {
}

export const PrimeInputText = InputText;
export type PrimeInputText = InputText;

import {NgModule} from '@angular/core';
import {SelectButton, SelectButtonModule} from "primeng/selectbutton";

@NgModule({
  exports: [SelectButtonModule]
})
export class PrimeSelectButtonModule {
}

export const PrimeSelectButton = SelectButton;
export type PrimeSelectButton = SelectButton;

import {NgModule} from '@angular/core';
import {RadioButton, RadioButtonModule} from "primeng/radiobutton";

@NgModule({
  exports: [RadioButtonModule]
})
export class PrimeRadioButtonModule {
}

export const PrimeRadioButton = RadioButton;
export type PrimeRadioButton = RadioButton;

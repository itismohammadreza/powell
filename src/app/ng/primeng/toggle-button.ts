import {NgModule} from '@angular/core';
import {ToggleButton, ToggleButtonModule} from "primeng/togglebutton";

@NgModule({
  exports: [ToggleButtonModule]
})
export class PrimeToggleButtonModule {
}

export const PrimeToggleButton = ToggleButton;

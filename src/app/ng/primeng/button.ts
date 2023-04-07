import {NgModule} from '@angular/core';
import {Button, ButtonModule} from "primeng/button";

@NgModule({
  exports: [ButtonModule]
})
export class PrimeButtonModule {
}

export const PrimeButton = Button;

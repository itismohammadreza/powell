import {NgModule} from '@angular/core';
import {Card, CardModule} from "primeng/card";

@NgModule({
  exports: [CardModule]
})
export class PrimeCardModule {
}

export const PrimeCard = Card;
export type PrimeCard = Card;

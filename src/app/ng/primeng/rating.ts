import {NgModule} from '@angular/core';
import {Rating, RatingModule} from "primeng/rating";

@NgModule({
  exports: [RatingModule]
})
export class PrimeRatingModule {
}

export const PrimeRating = Rating;
export type PrimeRating = Rating;

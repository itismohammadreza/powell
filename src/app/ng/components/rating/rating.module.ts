import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "@ng/components/rating";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeRatingModule} from "@ng/primeng";

@NgModule({
  declarations: [RatingComponent],
  exports: [RatingComponent],
  imports: [
    PrimeRatingModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
  ],
})
export class RatingModule {
}

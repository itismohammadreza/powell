import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
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
    ConfigHandlerModule,
  ],
})
export class RatingModule {
}

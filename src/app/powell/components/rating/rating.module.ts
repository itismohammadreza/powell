import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "@powell/components/rating";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeRatingModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [RatingComponent],
  exports: [RatingComponent],
  imports: [
    PrimeRatingModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule
  ],
})
export class RatingModule {
}

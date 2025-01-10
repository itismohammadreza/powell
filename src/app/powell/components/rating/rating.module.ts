import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "@powell/components/rating";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$RatingModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [RatingComponent],
  exports: [RatingComponent],
  imports: [
    $RatingModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class RatingModule {
}

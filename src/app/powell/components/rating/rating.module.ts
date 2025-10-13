import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
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
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class RatingModule {
}

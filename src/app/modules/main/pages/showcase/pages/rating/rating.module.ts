import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RatingModule as PRatingModule} from 'primeng/rating';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {RatingComponent} from "@ng/components/rating";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [RatingComponent],
  imports: [
    PRatingModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [RatingComponent]
})
export class RatingModule {
}

import {NgModule} from "@angular/core";
import {RatingModule as PRatingModule} from 'primeng/autocomplete';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {RatingComponent} from "@ng/components/rating";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [RatingComponent],
  imports: [PRatingModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [RatingComponent]
})
export class RatingModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SliderComponent} from "@ng/components/slider";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeSliderModule} from "@ng/primeng";

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [
    PrimeSliderModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
  ],
})
export class SliderModule {
}

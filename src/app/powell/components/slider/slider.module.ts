import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SliderComponent} from "@powell/components/slider";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeSliderModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [
    PrimeSliderModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule
  ],
})
export class SliderModule {
}

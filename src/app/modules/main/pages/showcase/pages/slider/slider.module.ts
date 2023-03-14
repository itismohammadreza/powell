import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SliderModule as PSliderModule} from 'primeng/slider';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {SliderComponent} from "@ng/components/slider";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [SliderComponent],
  imports: [
    PSliderModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [SliderComponent]
})
export class SliderModule {
}

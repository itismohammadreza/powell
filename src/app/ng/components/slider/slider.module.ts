import {NgModule} from "@angular/core";
import {SliderModule as PSliderModule} from 'primeng/slider';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {SliderComponent} from "@ng/components/slider";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [SliderComponent],
  imports: [PSliderModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [SliderComponent]
})
export class SliderModule {
}

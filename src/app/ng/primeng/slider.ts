import {NgModule} from '@angular/core';
import {Slider, SliderModule} from "primeng/slider";

@NgModule({
  exports: [SliderModule]
})
export class PrimeSliderModule {
}

export const PrimeSlider = Slider;

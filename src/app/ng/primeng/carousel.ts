import {NgModule} from '@angular/core';
import {Carousel, CarouselModule} from "primeng/carousel";

@NgModule({
  exports: [CarouselModule]
})
export class PrimeCarouselModule {
}

export const PrimeCarousel = Carousel;
export type PrimeCarousel = Carousel;

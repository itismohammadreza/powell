import {NgModule} from '@angular/core';
import {Image, ImageModule} from "primeng/image";

@NgModule({
  exports: [ImageModule]
})
export class PrimeImageModule {
}

export const PrimeImage = Image;

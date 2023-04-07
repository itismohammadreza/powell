import {NgModule} from '@angular/core';
import {Galleria, GalleriaModule} from "primeng/galleria";

@NgModule({
  exports: [GalleriaModule]
})
export class PrimeGalleriaModule {
}

export const PrimeGalleria = Galleria;
export type PrimeGalleria = Galleria;

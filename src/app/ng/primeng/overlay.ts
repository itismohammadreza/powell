import {NgModule} from '@angular/core';
import {Overlay, OverlayModule} from "primeng/overlay";

@NgModule({
  exports: [OverlayModule]
})
export class PrimeOverlayModule {
}

export const PrimeOverlay = Overlay;

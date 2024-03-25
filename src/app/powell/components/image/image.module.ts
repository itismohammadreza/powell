import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageComponent} from "@powell/components/image";
import {PrimeFocusTrapModule, PrimeImageModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {PinchZoomModule} from "@powell/components/pinch-zoom";
import {
  PrimeEyeIcon,
  PrimeRefreshIcon,
  PrimeSearchMinusIcon,
  PrimeSearchPlusIcon,
  PrimeTimesIcon,
  PrimeUndoIcon
} from "@powell/primeng/api";

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent, TemplateModule],
  imports: [
    PrimeImageModule,
    PinchZoomModule,
    CommonModule,
    PrimeRefreshIcon,
    PrimeEyeIcon,
    PrimeUndoIcon,
    PrimeSearchMinusIcon,
    PrimeSearchPlusIcon,
    PrimeTimesIcon,
    PrimeFocusTrapModule
  ],
})
export class ImageModule {
}

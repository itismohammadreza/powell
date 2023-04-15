import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageComponent} from "@ng/components/image";
import {PrimeImageModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";
import {PinchZoomModule} from "@ng/components/pinch-zoom";

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent, TemplateModule],
  imports: [PrimeImageModule, PinchZoomModule, CommonModule],
})
export class ImageModule {
}

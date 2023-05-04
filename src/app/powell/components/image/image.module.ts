import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageComponent} from "@powell/components/image";
import {PrimeImageModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {PinchZoomModule} from "@powell/components/pinch-zoom";

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent, TemplateModule],
  imports: [PrimeImageModule, PinchZoomModule, CommonModule],
})
export class ImageModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageComponent, PinchZoomComponent} from "@ng/components/image";
import {PrimeImageModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [ImageComponent, PinchZoomComponent],
  exports: [ImageComponent, TemplateModule],
  imports: [PrimeImageModule, CommonModule],
})
export class ImageModule {
}

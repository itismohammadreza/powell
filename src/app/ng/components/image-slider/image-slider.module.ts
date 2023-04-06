import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageSliderComponent} from "@ng/components/image-slider";
import {PrimeGalleriaModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [ImageSliderComponent],
  exports: [ImageSliderComponent, TemplateModule],
  imports: [PrimeGalleriaModule, CommonModule],
})
export class ImageSliderModule {
}

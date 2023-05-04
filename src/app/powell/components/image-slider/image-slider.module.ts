import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageSliderComponent} from "@powell/components/image-slider";
import {PrimeGalleriaModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ImageSliderComponent],
  exports: [ImageSliderComponent, TemplateModule],
  imports: [PrimeGalleriaModule, CommonModule],
})
export class ImageSliderModule {
}

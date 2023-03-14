import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GalleriaModule} from "primeng/galleria";
import {ImageSliderComponent} from "@ng/components/image-slider";

@NgModule({
  declarations: [ImageSliderComponent],
  imports: [GalleriaModule, CommonModule],
  exports: [ImageSliderComponent]
})
export class ImageSliderModule {
}

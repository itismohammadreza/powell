import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ImageSliderComponent} from "@ng/components/image-slider";
import {GalleriaModule} from "primeng/galleria";

@NgModule({
  declarations: [ImageSliderComponent],
  imports: [GalleriaModule, CommonModule],
  exports: [ImageSliderComponent]
})
export class ImageSliderModule {
}

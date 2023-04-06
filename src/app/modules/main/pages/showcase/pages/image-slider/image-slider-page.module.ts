import {NgModule} from "@angular/core";
import {ImageSliderModule} from "@ng/components/image-slider";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ImageSliderPage} from "@modules/main/pages/showcase/pages/image-slider";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [ImageSliderPage],
  imports: [
    ImageSliderModule,
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ImageSliderPage}])
  ]
})
export class ImageSliderPageModule {
}

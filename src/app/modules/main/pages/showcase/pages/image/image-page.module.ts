import {NgModule} from "@angular/core";
import {ImageModule} from "@powell/components/image";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ImagePage} from "@modules/main/pages/showcase/pages/image";

@NgModule({
  declarations: [ImagePage],
  imports: [
    ImageModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ImagePage}])
  ],
})
export class ImagePageModule {
}

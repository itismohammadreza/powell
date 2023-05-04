import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SliderModule} from "@powell/components/slider";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {SliderPage} from "@modules/main/pages/showcase/pages/slider";

@NgModule({
  declarations: [SliderPage],
  imports: [
    SliderModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: SliderPage}])
  ],
})
export class SliderPageModule {
}

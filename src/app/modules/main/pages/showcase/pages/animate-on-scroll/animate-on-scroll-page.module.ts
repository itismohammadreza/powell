import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {AnimateOnScrollPage} from "@modules/main/pages/showcase/pages/animate-on-scroll";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AnimateOnScrollPage],
  imports: [
    ExtrasModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: AnimateOnScrollPage}])
  ],
})
export class AnimateOnScrollPageModule {
}

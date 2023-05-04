import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RatingModule} from "@powell/components/rating";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {RatingPage} from "@modules/main/pages/showcase/pages/rating";

@NgModule({
  declarations: [RatingPage],
  imports: [
    RatingModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: RatingPage}])
  ],
})
export class RatingPageModule {
}

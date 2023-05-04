import {NgModule} from "@angular/core";
import {ChipsModule} from "@powell/components/chips";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ChipsPage} from "@modules/main/pages/showcase/pages/chips";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ChipsPage],
  imports: [
    ChipsModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ChipsPage}])
  ],
})
export class ChipsPageModule {
}

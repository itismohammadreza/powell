import {NgModule} from "@angular/core";
import {RadioModule} from "@powell/components/radio";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RadioPage} from "@modules/main/pages/showcase/pages/radio";

@NgModule({
  declarations: [RadioPage],
  imports: [
    RadioModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: RadioPage}])
  ],
})
export class RadioPageModule {
}

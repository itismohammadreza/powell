import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "@powell/components/input-text";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InputTextPage} from "@modules/main/pages/showcase/pages/input-text";

@NgModule({
  declarations: [InputTextPage],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InputTextPage}])
  ],
})
export class InputTextPageModule {
}

import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "@powell/components/input-textarea";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InputTextareaPage} from "@modules/main/pages/showcase/pages/input-textarea";

@NgModule({
  declarations: [InputTextareaPage],
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InputTextareaPage}])
  ],
})
export class InputTextareaPageModule {
}

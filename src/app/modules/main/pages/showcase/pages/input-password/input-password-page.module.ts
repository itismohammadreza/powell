import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputPasswordModule} from "@powell/components/input-password";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InputPasswordPage} from "@modules/main/pages/showcase/pages/input-password";

@NgModule({
  declarations: [InputPasswordPage],
  imports: [
    InputPasswordModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InputPasswordPage}])
  ],
})
export class InputPasswordPageModule {
}

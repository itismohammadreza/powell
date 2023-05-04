import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "@powell/components/input-mask";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InputMaskPage} from "@modules/main/pages/showcase/pages/input-mask";

@NgModule({
  declarations: [InputMaskPage],
  imports: [
    InputMaskModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InputMaskPage}])
  ],
})
export class InputMaskPageModule {
}

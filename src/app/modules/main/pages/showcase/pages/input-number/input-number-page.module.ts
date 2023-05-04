import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "@powell/components/input-number";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InputNumberPage} from "@modules/main/pages/showcase/pages/input-number";

@NgModule({
  declarations: [InputNumberPage],
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InputNumberPage}])
  ],
})
export class InputNumberPageModule {
}

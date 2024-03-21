import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {CheckboxGroupModule} from "src/app/powell/components/checkbox-group";
import {CheckboxGroupPage} from "src/app/modules/main/pages/showcase/pages/checkbox-group";

@NgModule({
  declarations: [CheckboxGroupPage],
  imports: [
    CheckboxGroupModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: CheckboxGroupPage}])
  ],
})
export class CheckboxGroupPageModule {
}

import {NgModule} from "@angular/core";
import {CheckboxModule} from "@powell/components/checkbox";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {CheckboxPage} from "@modules/main/pages/showcase/pages/checkbox";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [CheckboxPage],
  imports: [
    CheckboxModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: CheckboxPage}])
  ],
})
export class CheckboxPageModule {
}

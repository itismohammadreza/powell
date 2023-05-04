import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {MultiCheckboxModule} from "@powell/components/multi-checkbox";
import {MultiCheckboxPage} from "@modules/main/pages/showcase/pages/multi-checkbox";

@NgModule({
  declarations: [MultiCheckboxPage],
  imports: [
    MultiCheckboxModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: MultiCheckboxPage}])
  ],
})
export class MultiCheckboxPageModule {
}

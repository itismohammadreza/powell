import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TriStateCheckboxModule} from "@powell/components/tri-state-checkbox";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {TriStateCheckboxPage} from "@modules/main/pages/showcase/pages/tri-state-checkbox";

@NgModule({
  declarations: [TriStateCheckboxPage],
  imports: [
    TriStateCheckboxModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: TriStateCheckboxPage}])
  ],
})
export class TriStateCheckboxPageModule {
}

import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "@powell/components/multi-select";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {MultiSelectPage} from "@modules/main/pages/showcase/pages/multi-select";

@NgModule({
  declarations: [MultiSelectPage],
  imports: [
    MultiSelectModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: MultiSelectPage}])
  ],
})
export class MultiSelectPageModule {
}

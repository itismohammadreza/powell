import {NgModule} from "@angular/core";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {CascadeSelectPage} from "@modules/main/pages/showcase/pages/cascade-select";
import {CascadeSelectModule} from "@powell/components/cascade-select";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [CascadeSelectPage],
  imports: [
    CascadeSelectModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: CascadeSelectPage}])
  ],
})
export class CascadeSelectPageModule {
}

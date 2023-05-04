import {NgModule} from "@angular/core";
import {DropdownModule} from "@powell/components/dropdown";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownPage} from "@modules/main/pages/showcase/pages/dropdown";

@NgModule({
  declarations: [DropdownPage],
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: DropdownPage}])
  ],
})
export class DropdownPageModule {
}

import {NgModule} from "@angular/core";
import {SelectButtonModule} from "@powell/components/select-button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {SelectButtonPage} from "@modules/main/pages/showcase/pages/select-button";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [SelectButtonPage],
  imports: [
    SelectButtonModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: SelectButtonPage}])
  ],
})
export class SelectButtonPageModule {
}

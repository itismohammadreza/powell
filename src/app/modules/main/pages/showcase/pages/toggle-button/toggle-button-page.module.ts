import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ToggleButtonModule} from "@powell/components/toggle-button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ToggleButtonPage} from "@modules/main/pages/showcase/pages/toggle-button";

@NgModule({
  declarations: [ToggleButtonPage],
  imports: [
    ToggleButtonModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ToggleButtonPage}])
  ],
})

export class ToggleButtonPageModule {
}

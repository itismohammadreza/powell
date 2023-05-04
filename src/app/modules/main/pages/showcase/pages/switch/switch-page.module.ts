import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SwitchModule} from "@powell/components/switch";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {SwitchPage} from "@modules/main/pages/showcase/pages/switch";

@NgModule({
  declarations: [SwitchPage],
  imports: [
    SwitchModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: SwitchPage}])
  ],
})
export class SwitchPageModule {
}

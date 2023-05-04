import {NgModule} from "@angular/core";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {DualLabelSwitchPage} from "@modules/main/pages/showcase/pages/dual-label-switch";
import {DualLabelSwitchModule} from "@powell/components/dual-label-switch";

@NgModule({
  declarations: [DualLabelSwitchPage],
  imports: [
    DualLabelSwitchModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: DualLabelSwitchPage}])
  ],
})
export class DualLabelSwitchPageModule {
}

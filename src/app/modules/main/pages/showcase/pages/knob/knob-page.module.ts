import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {KnobModule} from "@powell/components/knob";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {KnobPage} from "@modules/main/pages/showcase/pages/knob";

@NgModule({
  declarations: [KnobPage],
  imports: [
    KnobModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: KnobPage}])
  ],
})
export class KnobPageModule {
}

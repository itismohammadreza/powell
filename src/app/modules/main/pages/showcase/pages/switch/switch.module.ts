import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputSwitchModule} from 'primeng/inputswitch';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {SwitchComponent} from "@ng/components/switch";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [SwitchComponent],
  imports: [
    InputSwitchModule,
    ProgressSpinnerModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [SwitchComponent]
})
export class SwitchModule {
}

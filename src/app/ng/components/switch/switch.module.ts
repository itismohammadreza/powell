import {NgModule} from "@angular/core";
import {InputSwitchModule} from 'primeng/inputswitch';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {SwitchComponent} from "@ng/components/switch";
import {LabelStarModule} from "@ng/pipes/label-star";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [SwitchComponent],
  imports: [InputSwitchModule, ProgressSpinnerModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [SwitchComponent]
})
export class SwitchModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DualLabelSwitchComponent} from "@powell/components/dual-label-switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeInputSwitchModule, PrimeProgressSpinnerModule} from "@powell/primeng";
import {AddonModule} from "@powell/directives/addon";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [DualLabelSwitchComponent],
  exports: [DualLabelSwitchComponent],
  imports: [
    PrimeInputSwitchModule,
    PrimeProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class DualLabelSwitchModule {
}

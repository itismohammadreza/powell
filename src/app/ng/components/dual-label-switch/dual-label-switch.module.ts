import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DualLabelSwitchComponent} from "@ng/components/dual-label-switch";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeInputSwitchModule, PrimeProgressSpinnerModule} from "@ng/primeng";
import {AddonModule} from "@ng/directives/addon";

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
  ],
})
export class DualLabelSwitchModule {
}

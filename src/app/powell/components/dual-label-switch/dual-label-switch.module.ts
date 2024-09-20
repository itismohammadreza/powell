import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DualLabelSwitchComponent} from "@powell/components/dual-label-switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputSwitchModule, $ProgressSpinnerModule} from "@powell/primeng";
import {AddonModule} from "@powell/directives/addon";

@NgModule({
  declarations: [DualLabelSwitchComponent],
  exports: [DualLabelSwitchComponent],
  imports: [
    $InputSwitchModule,
    $ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class DualLabelSwitchModule {
}

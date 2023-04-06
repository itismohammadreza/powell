import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {SwitchComponent} from "@ng/components/switch";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeInputSwitchModule, PrimeProgressSpinnerModule} from "@ng/primeng";

@NgModule({
  declarations: [SwitchComponent],
  exports: [SwitchComponent],
  imports: [
    PrimeInputSwitchModule,
    PrimeProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
  ],
})
export class SwitchModule {
}

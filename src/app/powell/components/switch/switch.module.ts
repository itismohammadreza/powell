import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SwitchComponent} from "@powell/components/switch";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeInputSwitchModule, PrimeProgressSpinnerModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [SwitchComponent],
  exports: [SwitchComponent],
  imports: [
    PrimeInputSwitchModule,
    PrimeProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule
  ],
})
export class SwitchModule {
}

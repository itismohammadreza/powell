import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {InputNumberComponent} from "@powell/components/input-number";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeInputNumberModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [InputNumberComponent],
  exports: [InputNumberComponent],
  imports: [
    PrimeInputNumberModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class InputNumberModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {InputTextComponent} from "@ng/components/input-text";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeInputTextModule, PrimeKeyFilterModule} from "@ng/primeng";

@NgModule({
  declarations: [InputTextComponent],
  exports: [InputTextComponent],
  imports: [
    PrimeInputTextModule,
    PrimeKeyFilterModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class InputTextModule {
}

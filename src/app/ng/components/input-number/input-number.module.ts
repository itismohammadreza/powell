import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {InputNumberComponent} from "@ng/components/input-number";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeInputNumberModule} from "@ng/primeng";

@NgModule({
  declarations: [InputNumberComponent],
  exports: [InputNumberComponent],
  imports: [
    PrimeInputNumberModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class InputNumberModule {
}

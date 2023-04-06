import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {LabelStarModule} from "@ng/pipes/label-star";
import {CheckboxComponent} from "@ng/components/checkbox";
import {PrimeCheckboxModule, PrimeProgressSpinnerModule} from "@ng/primeng";
import {AddonModule} from "@ng/directives/addon";

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [
    PrimeCheckboxModule,
    PrimeProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class CheckboxModule {
}

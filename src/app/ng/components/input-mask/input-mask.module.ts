import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputMaskComponent} from "@ng/components/input-mask";
import {PrimeInputMaskModule} from "@ng/primeng";

@NgModule({
  declarations: [InputMaskComponent],
  exports: [InputMaskComponent],
  imports: [
    PrimeInputMaskModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class InputMaskModule {
}

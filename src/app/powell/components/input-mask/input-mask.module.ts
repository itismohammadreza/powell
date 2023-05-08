import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputMaskComponent} from "@powell/components/input-mask";
import {PrimeInputMaskModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [InputMaskComponent],
  exports: [InputMaskComponent],
  imports: [
    PrimeInputMaskModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class InputMaskModule {
}

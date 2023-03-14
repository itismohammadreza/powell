import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputMaskModule as PInputMaskModule} from 'primeng/inputmask';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputMaskComponent} from "@ng/components/input-mask";

@NgModule({
  declarations: [InputMaskComponent],
  imports: [
    PInputMaskModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [InputMaskComponent]
})
export class InputMaskModule {
}

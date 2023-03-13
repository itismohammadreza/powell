import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputNumberModule as PInputNumberModule} from 'primeng/inputnumber';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {InputNumberComponent} from "@ng/components/input-number";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [InputNumberComponent],
  imports: [
    PInputNumberModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [InputNumberComponent]
})
export class InputNumberModule {
}

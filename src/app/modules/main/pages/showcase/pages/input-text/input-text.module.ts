import {NgModule} from "@angular/core";
import {InputTextModule as PInputTextModule} from 'primeng/inputtext';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {KeyFilterModule} from "primeng/keyfilter";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {InputTextComponent} from "@ng/components/input-text";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [InputTextComponent],
  imports: [
    PInputTextModule,
    KeyFilterModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [InputTextComponent]
})
export class InputTextModule {
}

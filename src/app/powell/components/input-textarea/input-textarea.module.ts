import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {InputTextareaComponent} from "@powell/components/input-textarea";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeInputTextareaModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [InputTextareaComponent],
  exports: [InputTextareaComponent],
  imports: [
    PrimeInputTextareaModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class InputTextareaModule {
}

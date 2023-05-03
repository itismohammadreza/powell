import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {InputTextareaComponent} from "@ng/components/input-textarea";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeInputTextareaModule} from "@ng/primeng";

@NgModule({
  declarations: [InputTextareaComponent],
  exports: [InputTextareaComponent],
  imports: [
    PrimeInputTextareaModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class InputTextareaModule {
}

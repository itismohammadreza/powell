import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {KnobComponent} from "@ng/components/knob";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeKnobModule} from "@ng/primeng";

@NgModule({
  declarations: [KnobComponent],
  exports: [KnobComponent],
  imports: [
    PrimeKnobModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
  ],
})
export class KnobModule {
}

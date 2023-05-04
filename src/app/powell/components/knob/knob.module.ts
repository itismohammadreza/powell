import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {KnobComponent} from "@powell/components/knob";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeKnobModule} from "@powell/primeng";

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

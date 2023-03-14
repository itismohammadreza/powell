import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {KnobModule as PKnobModule} from 'primeng/knob';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {KnobComponent} from "@ng/components/knob";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [KnobComponent],
  imports: [
    PKnobModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [KnobComponent]
})
export class KnobModule {
}

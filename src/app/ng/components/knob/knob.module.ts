import {NgModule} from "@angular/core";
import {KnobModule as PKnobModule} from 'primeng/knob';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {KnobComponent} from "@ng/components/knob";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [KnobComponent],
  imports: [PKnobModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [KnobComponent]
})
export class KnobModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {KnobComponent} from "@powell/components/knob";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$KnobModule} from "@powell/primeng";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [KnobComponent],
  exports: [KnobComponent],
  imports: [
    $KnobModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule
  ],
})
export class KnobModule {
}

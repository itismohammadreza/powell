import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {KnobComponent} from "@powell/components/knob";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$KnobModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [KnobComponent],
  exports: [KnobComponent],
  imports: [
    $KnobModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class KnobModule {
}

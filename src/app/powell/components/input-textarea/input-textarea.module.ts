import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {InputTextareaComponent} from "@powell/components/input-textarea";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputTextareaModule} from "@powell/primeng";

@NgModule({
  declarations: [InputTextareaComponent],
  exports: [InputTextareaComponent],
  imports: [
    $InputTextareaModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class InputTextareaModule {
}

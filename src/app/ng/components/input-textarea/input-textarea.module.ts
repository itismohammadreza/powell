import {NgModule} from "@angular/core";
import {InputTextareaModule as PInputTextareaModule} from 'primeng/inputtextarea';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {InputTextareaComponent} from "@ng/components/input-textarea";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [InputTextareaComponent],
  imports: [PInputTextareaModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [InputTextareaComponent]
})
export class InputTextareaModule {
}

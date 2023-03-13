import {NgModule} from "@angular/core";
import {CheckboxModule as PCheckboxModule} from 'primeng/checkbox';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {CheckboxComponent} from "@ng/components/checkbox";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [CheckboxComponent],
  imports: [PCheckboxModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [CheckboxComponent]
})
export class MultiCheckboxModule {
}

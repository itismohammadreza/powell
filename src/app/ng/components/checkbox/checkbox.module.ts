import {NgModule} from "@angular/core";
import {CheckboxModule as PCheckboxModule} from 'primeng/checkbox';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {CheckboxComponent} from "@ng/components/checkbox";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    PCheckboxModule,
    ProgressSpinnerModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [CheckboxComponent]
})
export class CheckboxModule {
}

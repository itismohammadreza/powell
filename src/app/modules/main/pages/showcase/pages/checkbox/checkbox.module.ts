import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CheckboxModule as PCheckboxModule} from 'primeng/checkbox';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {LabelStarModule} from "@ng/pipes/label-star";
import {CheckboxComponent} from "@ng/components/checkbox";

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    PCheckboxModule,
    ProgressSpinnerModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [CheckboxComponent]
})
export class CheckboxModule {
}

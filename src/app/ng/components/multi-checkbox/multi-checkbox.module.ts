import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CheckboxModule as PCheckboxModule} from 'primeng/checkbox';
import {MultiCheckboxComponent} from "@ng/components/multi-checkbox/multi-checkbox.component";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [MultiCheckboxComponent],
  imports: [
    PCheckboxModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [MultiCheckboxComponent]
})
export class MultiCheckboxModule {
}

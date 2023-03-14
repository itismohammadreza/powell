import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule as PMultiSelectModule} from 'primeng/multiselect';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {MultiSelectComponent} from "@ng/components/multi-select";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [MultiSelectComponent],
  imports: [
    PMultiSelectModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [MultiSelectComponent]
})
export class MultiSelectModule {
}

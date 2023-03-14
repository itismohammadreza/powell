import {NgModule} from "@angular/core";
import {TriStateCheckboxModule as PTriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {TriStateCheckboxComponent} from "@ng/components/tri-state-checkbox";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [TriStateCheckboxComponent],
  imports: [
    PTriStateCheckboxModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [TriStateCheckboxComponent]
})
export class TriStateCheckboxModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TriStateCheckboxComponent} from "@ng/components/tri-state-checkbox";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeTriStateCheckboxModule} from "@ng/primeng";

@NgModule({
  declarations: [TriStateCheckboxComponent],
  exports: [TriStateCheckboxComponent],
  imports: [
    PrimeTriStateCheckboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
  ],
})
export class TriStateCheckboxModule {
}

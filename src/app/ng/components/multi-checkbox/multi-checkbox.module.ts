import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultiCheckboxComponent} from "@ng/components/multi-checkbox/multi-checkbox.component";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeCheckboxModule} from "@ng/primeng";

@NgModule({
  declarations: [MultiCheckboxComponent],
  exports: [MultiCheckboxComponent],
  imports: [
    PrimeCheckboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
  ],
})
export class MultiCheckboxModule {
}

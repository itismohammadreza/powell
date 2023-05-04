import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultiCheckboxComponent} from "@powell/components/multi-checkbox";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeCheckboxModule} from "@powell/primeng";

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

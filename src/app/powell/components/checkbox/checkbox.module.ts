import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {CheckboxComponent} from "@powell/components/checkbox";
import {PrimeCheckboxModule, PrimeProgressSpinnerModule} from "@powell/primeng";
import {AddonModule} from "@powell/directives/addon";

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [
    PrimeCheckboxModule,
    PrimeProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class CheckboxModule {
}

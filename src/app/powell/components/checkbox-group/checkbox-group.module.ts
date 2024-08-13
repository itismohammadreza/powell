import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CheckboxGroupComponent} from "src/app/powell/components/checkbox-group";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeCheckboxModule} from "@powell/primeng";

@NgModule({
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
  imports: [
    PrimeCheckboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule
  ],
})
export class CheckboxGroupModule {
}

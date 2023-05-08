import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TriStateCheckboxComponent} from "@powell/components/tri-state-checkbox";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeTriStateCheckboxModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [TriStateCheckboxComponent],
  exports: [TriStateCheckboxComponent],
  imports: [
    PrimeTriStateCheckboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule
  ],
})
export class TriStateCheckboxModule {
}

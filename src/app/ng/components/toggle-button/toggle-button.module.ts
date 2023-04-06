import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {ToggleButtonComponent} from "@ng/components/toggle-button";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeToggleButtonModule} from "@ng/primeng";

@NgModule({
  declarations: [ToggleButtonComponent],
  exports: [ToggleButtonComponent],
  imports: [
    PrimeToggleButtonModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
  ],
})

export class ToggleButtonModule {
}

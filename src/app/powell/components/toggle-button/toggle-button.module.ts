import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToggleButtonComponent} from "@powell/components/toggle-button";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeToggleButtonModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [ToggleButtonComponent],
  exports: [ToggleButtonComponent],
  imports: [
    PrimeToggleButtonModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule
  ],
})

export class ToggleButtonModule {
}

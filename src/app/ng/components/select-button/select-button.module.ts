import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {SelectButtonComponent} from "@ng/components/select-button";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeSelectButtonModule} from "@ng/primeng";

@NgModule({
  declarations: [SelectButtonComponent],
  exports: [SelectButtonComponent],
  imports: [
    PrimeSelectButtonModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
  ],
})
export class SelectButtonModule {
}

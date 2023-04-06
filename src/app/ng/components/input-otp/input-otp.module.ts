import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {InputOtpComponent} from "@ng/components/input-otp";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeInputTextModule, PrimeKeyFilterModule} from "@ng/primeng";

@NgModule({
  declarations: [InputOtpComponent],
  exports: [InputOtpComponent],
  imports: [
    PrimeInputTextModule,
    PrimeKeyFilterModule,
    CommonModule,
    ReactiveFormsModule,
    LabelStarModule,
    ConfigHandlerModule,
  ],
})
export class InputOtpModule {
}

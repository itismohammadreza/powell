import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {InputOtpComponent} from "@powell/components/input-otp";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeInputTextModule, PrimeKeyFilterModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [InputOtpComponent],
  exports: [InputOtpComponent],
  imports: [
    PrimeInputTextModule,
    PrimeKeyFilterModule,
    CommonModule,
    ReactiveFormsModule,
    LabelStarModule,
    ConfigHandlerModule
  ],
})
export class InputOtpModule {
}

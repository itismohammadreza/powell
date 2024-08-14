import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputOtpComponent} from "@powell/components/input-otp";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeInputOtpModule} from "@powell/primeng/input-otp";

@NgModule({
  declarations: [InputOtpComponent],
  exports: [InputOtpComponent],
  imports: [
    PrimeInputOtpModule,
    CommonModule,
    FormsModule,
    LabelStarModule
  ],
})
export class InputOtpModule {
}

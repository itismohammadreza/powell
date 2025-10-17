import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {InputOtpComponent} from "@powell/components/input-otp";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputOtpModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [InputOtpComponent],
  exports: [InputOtpComponent],
  imports: [
    $InputOtpModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class InputOtpModule {
}

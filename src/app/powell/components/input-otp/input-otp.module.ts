import {NgModule} from "@angular/core";
import {NgClass, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputOtpComponent} from "@powell/components/input-otp";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputOtpModule} from "@powell/primeng/input-otp";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [InputOtpComponent],
  exports: [InputOtpComponent],
  imports: [
    $InputOtpModule,
    NgStyle,
    NgClass,
    FormsModule,
    LabelStarModule,
    FormFieldModule
  ],
})
export class InputOtpModule {
}

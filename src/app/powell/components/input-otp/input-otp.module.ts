import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputOtpComponent} from "@powell/components/input-otp";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$InputOtpModule} from "@powell/primeng/input-otp";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [InputOtpComponent],
  exports: [InputOtpComponent],
  imports: [
    $InputOtpModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule
  ],
})
export class InputOtpModule {
}

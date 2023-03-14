import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputTextModule} from "primeng/inputtext";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {InputOtpComponent} from "@ng/components/input-otp";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [InputOtpComponent],
  imports: [
    InputTextModule,
    KeyFilterModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputOtpComponent]
})
export class InputOtpModule {
}

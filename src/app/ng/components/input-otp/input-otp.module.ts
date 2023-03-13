import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {InputOtpComponent} from "@ng/components/input-otp";
import {KeyFilterModule} from "primeng/keyfilter";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [InputOtpComponent],
  imports: [InputTextModule, KeyFilterModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, ReactiveFormsModule],
  exports: [InputOtpComponent]
})
export class InputOtpModule {
}

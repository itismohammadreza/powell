import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from 'primeng/password';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputPasswordComponent} from "@ng/components/input-password";

@NgModule({
  declarations: [InputPasswordComponent],
  imports: [
    PasswordModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [InputPasswordComponent]
})
export class InputPasswordModule {
}

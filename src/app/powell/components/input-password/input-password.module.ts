import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputPasswordComponent} from "@powell/components/input-password";
import {PrimePasswordModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent, TemplateModule],
  imports: [
    PrimePasswordModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class InputPasswordModule {
}

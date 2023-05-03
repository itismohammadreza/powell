import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {InputPasswordComponent} from "@ng/components/input-password";
import {PrimePasswordModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent, TemplateModule],
  imports: [
    PrimePasswordModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class InputPasswordModule {
}

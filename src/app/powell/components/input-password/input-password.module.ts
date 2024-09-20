import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputPasswordComponent} from "@powell/components/input-password";
import {$PasswordModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent, TemplateModule],
  imports: [
    $PasswordModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class InputPasswordModule {
}

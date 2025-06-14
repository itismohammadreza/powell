import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {InputPasswordComponent} from "@powell/components/input-password";
import {$PasswordModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent, TemplateModule],
  imports: [
    $PasswordModule,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class InputPasswordModule {
}

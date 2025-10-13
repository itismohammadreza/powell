import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextComponent} from "@powell/components/input-text";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$FloatLabelModule, $InputTextModule, $KeyFilterModule, $TimesIcon} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InputTextComponent],
  exports: [InputTextComponent, TemplateModule],
  imports: [
    $InputTextModule,
    $KeyFilterModule,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    $TimesIcon,
    $FloatLabelModule,
    FormFieldModule,
    TemplateModule
  ],
})
export class InputTextModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextComponent} from "@powell/components/input-text";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$FloatLabelModule, $InputTextModule, $KeyFilterModule, $TimesIcon} from "@powell/primeng";
import {ElementAdditionsModule} from "@powell/components/element-additions";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InputTextComponent],
  exports: [InputTextComponent, TemplateModule],
  imports: [
    $InputTextModule,
    $KeyFilterModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    $TimesIcon,
    $FloatLabelModule,
    ElementAdditionsModule,
    TemplateModule
  ],
})
export class InputTextModule {
}

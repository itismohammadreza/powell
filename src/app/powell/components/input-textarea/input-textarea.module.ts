import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextareaComponent} from "@powell/components/input-textarea";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TextareaModule} from "@powell/primeng";
import {ElementAdditionsModule} from "@powell/components/element-additions";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InputTextareaComponent],
  exports: [InputTextareaComponent],
  imports: [
    $TextareaModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule,
    TemplateModule,
  ],
})
export class InputTextareaModule {
}

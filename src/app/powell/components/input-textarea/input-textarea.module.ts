import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextareaComponent} from "@powell/components/input-textarea";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TextareaModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [InputTextareaComponent],
  exports: [InputTextareaComponent, TemplateModule],
  imports: [
    $TextareaModule,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
    TemplateModule,
  ],
})
export class InputTextareaModule {
}

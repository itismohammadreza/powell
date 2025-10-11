import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {CheckboxComponent} from "@powell/components/checkbox";
import {$CheckboxModule, $ProgressSpinnerModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent, TemplateModule],
  imports: [
    $CheckboxModule,
    $ProgressSpinnerModule,
    NgStyle,
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
    TemplateModule,
  ],
})
export class CheckboxModule {
}

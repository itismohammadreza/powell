import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {CheckboxComponent} from "@powell/components/checkbox";
import {$CheckboxModule, $ProgressSpinnerModule} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [
    $CheckboxModule,
    $ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
    TemplateModule,
  ],
})
export class CheckboxModule {
}

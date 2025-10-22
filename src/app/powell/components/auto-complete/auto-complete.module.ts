import {NgModule} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {$AutoCompleteModule} from "@powell/primeng";
import {AutoCompleteComponent} from "@powell/components/auto-complete";
import {LabelStarModule} from "@powell/pipes/label-star";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent, TemplateModule],
  imports: [
    $AutoCompleteModule,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ]
})
export class AutoCompleteModule {
}

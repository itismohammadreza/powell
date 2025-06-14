import {NgModule} from "@angular/core";
import {NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultiSelectComponent} from "@powell/components/multi-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$MultiSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [MultiSelectComponent],
  exports: [MultiSelectComponent, TemplateModule],
  imports: [
    $MultiSelectModule,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class MultiSelectModule {
}

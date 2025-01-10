import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CascadeSelectComponent} from "@powell/components/cascade-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$CascadeSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [CascadeSelectComponent],
  exports: [CascadeSelectComponent, TemplateModule],
  imports: [
    $CascadeSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class CascadeSelectModule {
}

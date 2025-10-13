import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TreeSelectComponent} from "@powell/components/tree-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TreeSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [TreeSelectComponent],
  exports: [TreeSelectComponent, TemplateModule],
  imports: [
    $TreeSelectModule,
    NgTemplateOutlet,
    FormsModule,
    LabelStarModule,
    FormFieldModule,
  ],
})
export class TreeSelectModule {
}

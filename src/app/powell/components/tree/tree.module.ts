import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {TreeComponent} from "@powell/components/tree";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TreeModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent, TemplateModule],
  imports: [
    $TreeModule,
    LabelStarModule,
    NgTemplateOutlet,
    FormFieldModule
  ],
})
export class TreeModule {
}

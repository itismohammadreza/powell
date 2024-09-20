import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {TreeSelectComponent} from "@powell/components/tree-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TreeSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [TreeSelectComponent],
  exports: [TreeSelectComponent, TemplateModule],
  imports: [
    $TreeSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class TreeSelectModule {
}

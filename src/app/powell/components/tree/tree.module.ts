import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TreeComponent} from "@powell/components/tree";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TreeModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent, TemplateModule],
  imports: [
    $TreeModule,
    LabelStarModule,
    CommonModule,
    ElementAdditionsModule
  ],
})
export class TreeModule {
}

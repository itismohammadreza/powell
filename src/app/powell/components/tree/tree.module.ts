import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AddonModule} from "@powell/directives/addon";
import {TreeComponent} from "@powell/components/tree";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeTreeModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent, TemplateModule],
  imports: [
    PrimeTreeModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    ConfigHandlerModule
  ],
})
export class TreeModule {
}

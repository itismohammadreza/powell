import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {TreeComponent} from "@ng/components/tree";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeTreeModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent, TemplateModule],
  imports: [
    PrimeTreeModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
  ],
})
export class TreeModule {
}

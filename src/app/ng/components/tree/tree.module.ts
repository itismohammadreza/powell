import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TreeModule as PTreeModule} from 'primeng/tree';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {TreeComponent} from "@ng/components/tree";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [TreeComponent],
  imports: [
    PTreeModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
  ],
  exports: [TreeComponent]
})
export class TreeModule {
}

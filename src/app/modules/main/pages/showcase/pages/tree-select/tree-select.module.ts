import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TreeSelectModule as PTreeSelectModule} from 'primeng/treeselect';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {TreeSelectComponent} from "@ng/components/tree-select";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [TreeSelectComponent],
  imports: [
    PTreeSelectModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [TreeSelectComponent]
})
export class TreeSelectModule {
}

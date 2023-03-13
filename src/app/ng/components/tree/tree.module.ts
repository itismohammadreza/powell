import {NgModule} from "@angular/core";
import {TreeModule as PTreeModule} from 'primeng/tree';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {TreeComponent} from "@ng/components/tree";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [TreeComponent],
  imports: [PTreeModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [TreeComponent]
})
export class TreeModule {
}

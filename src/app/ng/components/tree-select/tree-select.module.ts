import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {TreeSelectComponent} from "@ng/components/tree-select";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeTreeSelectModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [TreeSelectComponent],
  exports: [TreeSelectComponent, TemplateModule],
  imports: [
    PrimeTreeSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class TreeSelectModule {
}

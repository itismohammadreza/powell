import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {TreeSelectComponent} from "@powell/components/tree-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeTreeSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [TreeSelectComponent],
  exports: [TreeSelectComponent, TemplateModule],
  imports: [
    PrimeTreeSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class TreeSelectModule {
}

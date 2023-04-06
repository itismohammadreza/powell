import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {ChipsComponent} from "@ng/components/chips";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeChipsModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [ChipsComponent],
  exports: [ChipsComponent, TemplateModule],
  imports: [
    PrimeChipsModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class ChipsModule {
}

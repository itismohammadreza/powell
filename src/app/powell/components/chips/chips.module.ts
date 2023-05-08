import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {ChipsComponent} from "@powell/components/chips";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeChipsModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [ChipsComponent],
  exports: [ChipsComponent, TemplateModule],
  imports: [
    PrimeChipsModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class ChipsModule {
}

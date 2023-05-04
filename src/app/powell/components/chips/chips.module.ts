import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {ChipsComponent} from "@powell/components/chips";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeChipsModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [ChipsComponent],
  exports: [ChipsComponent, TemplateModule],
  imports: [
    PrimeChipsModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class ChipsModule {
}

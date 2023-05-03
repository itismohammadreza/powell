import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PrimeAutoCompleteModule} from "@ng/primeng";
import {AutoCompleteComponent} from "@ng/components/auto-complete";
import {LabelStarModule} from "@ng/pipes/label-star";
import {AddonModule} from "@ng/directives/addon";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent, TemplateModule],
  imports: [
    PrimeAutoCompleteModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ]
})
export class AutoCompleteModule {
}

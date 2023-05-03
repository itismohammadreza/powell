import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {MultiSelectComponent} from "@ng/components/multi-select";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeMultiSelectModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [MultiSelectComponent],
  exports: [MultiSelectComponent, TemplateModule],
  imports: [
    PrimeMultiSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class MultiSelectModule {
}

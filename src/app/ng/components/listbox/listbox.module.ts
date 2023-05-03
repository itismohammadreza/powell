import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {ListboxComponent} from "@ng/components/listbox";
import {PrimeListboxModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [ListboxComponent],
  exports: [ListboxComponent, TemplateModule],
  imports: [
    PrimeListboxModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class ListboxModule {
}

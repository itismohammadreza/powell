import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {DropdownComponent} from "@ng/components/dropdown";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeDropdownModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [DropdownComponent],
  exports: [DropdownComponent, TemplateModule],
  imports: [
    PrimeDropdownModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class DropdownModule {
}

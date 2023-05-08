import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {MultiSelectComponent} from "@powell/components/multi-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeMultiSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [MultiSelectComponent],
  exports: [MultiSelectComponent, TemplateModule],
  imports: [
    PrimeMultiSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class MultiSelectModule {
}

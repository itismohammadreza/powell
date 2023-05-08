import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PrimeAutoCompleteModule} from "@powell/primeng";
import {AutoCompleteComponent} from "@powell/components/auto-complete";
import {LabelStarModule} from "@powell/pipes/label-star";
import {AddonModule} from "@powell/directives/addon";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent, TemplateModule],
  imports: [
    PrimeAutoCompleteModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ]
})
export class AutoCompleteModule {
}

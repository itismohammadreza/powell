import {NgModule} from "@angular/core";
import {AutoCompleteModule as PAutoCompleteModule} from 'primeng/autocomplete';
import {AutoCompleteComponent} from "@ng/components/auto-complete";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    PAutoCompleteModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [AutoCompleteComponent]
})
export class AutoCompleteModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ListboxModule as PListboxModule} from 'primeng/listbox';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {LabelStarModule} from "@ng/pipes/label-star";
import {ListboxComponent} from "@ng/components/listbox";

@NgModule({
  declarations: [ListboxComponent],
  imports: [
    PListboxModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [ListboxComponent]
})
export class ListboxModule {
}

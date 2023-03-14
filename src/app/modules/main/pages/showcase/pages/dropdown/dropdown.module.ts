import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DropdownModule as PDropdownModule} from 'primeng/dropdown';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {DropdownComponent} from "@ng/components/dropdown";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    PDropdownModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [DropdownComponent]
})
export class DropdownModule {
}

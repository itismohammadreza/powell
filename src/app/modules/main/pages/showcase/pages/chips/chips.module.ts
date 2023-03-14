import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChipsModule as PChipsModule} from 'primeng/chips';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {ChipsComponent} from "@ng/components/chips";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [ChipsComponent],
  imports: [
    PChipsModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [ChipsComponent]
})
export class ChipsModule {
}

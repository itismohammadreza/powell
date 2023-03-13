import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {IranMapComponent} from "@ng/components/iran-map";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [IranMapComponent],
  imports: [ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule],
  exports: [IranMapComponent]
})
export class IranMapModule {
}

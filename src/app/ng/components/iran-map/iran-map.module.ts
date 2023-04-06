import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {IranMapComponent} from "@ng/components/iran-map";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [IranMapComponent],
  exports: [IranMapComponent],
  imports: [
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule
  ],
})
export class IranMapModule {
}

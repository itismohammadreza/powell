import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IranMapComponent} from "@powell/components/iran-map";
import {LabelStarModule} from "@powell/pipes/label-star";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [IranMapComponent],
  exports: [IranMapComponent],
  imports: [
    LabelStarModule,
    CommonModule,
    ConfigHandlerModule
  ],
})
export class IranMapModule {
}

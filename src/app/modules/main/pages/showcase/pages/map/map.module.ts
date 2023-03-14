import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {TooltipModule} from "primeng/tooltip";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {MapComponent} from "@ng/components/map";
import {ButtonModule} from "@ng/components/button";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [MapComponent],
  imports: [
    ButtonModule,
    TooltipModule,
    LeafletModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
  ],
  exports: [MapComponent]
})
export class MapModule {
}

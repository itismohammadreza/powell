import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {AddonModule} from "@ng/directives/addon";
import {MapComponent} from "@ng/components/map";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeTooltipModule} from "@ng/primeng";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    ButtonModule,
    PrimeTooltipModule,
    LeafletModule,
    CommonModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class MapModule {
}

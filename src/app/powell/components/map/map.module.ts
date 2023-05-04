import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {AddonModule} from "@powell/directives/addon";
import {MapComponent} from "@powell/components/map";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeTooltipModule} from "@powell/primeng";
import {ButtonModule} from "@powell/components/button";

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

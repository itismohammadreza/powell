import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {AddonModule} from "@powell/directives/addon";
import {MapComponent} from "@powell/components/map";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeTooltipModule, PrimeTrashIcon} from "@powell/primeng";
import {ButtonModule} from "@powell/components/button";
import {TemplateModule} from "@powell/directives/template";

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent, TemplateModule],
  imports: [
    ButtonModule,
    PrimeTooltipModule,
    LeafletModule,
    CommonModule,
    LabelStarModule,
    AddonModule,
    TemplateModule,
    PrimeTrashIcon
  ],
})
export class MapModule {
}

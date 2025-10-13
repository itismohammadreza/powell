import {NgModule} from "@angular/core";
import {LeafletModule} from "@bluehalo/ngx-leaflet";
import {MapComponent} from "@powell/components/map";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$TooltipModule, $TrashIcon} from "@powell/primeng";
import {ButtonModule} from "@powell/components/button";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent, TemplateModule],
  imports: [
    ButtonModule,
    $TooltipModule,
    LeafletModule,
    LabelStarModule,
    TemplateModule,
    $TrashIcon,
    FormFieldModule
  ],
})
export class MapModule {
}

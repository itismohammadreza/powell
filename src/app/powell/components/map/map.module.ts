import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
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
    CommonModule,
    LabelStarModule,
    TemplateModule,
    $TrashIcon,
    FormFieldModule
  ],
})
export class MapModule {
}

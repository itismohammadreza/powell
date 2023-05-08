import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {CascadeSelectComponent} from "@powell/components/cascade-select";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeCascadeSelectModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [CascadeSelectComponent],
  exports: [CascadeSelectComponent, TemplateModule],
  imports: [
    PrimeCascadeSelectModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class CascadeSelectModule {
}

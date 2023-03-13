import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CascadeSelectModule as PCascadeSelectModule} from 'primeng/cascadeselect';
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {CascadeSelectComponent} from "@ng/components/cascade-select";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [CascadeSelectComponent],
  imports: [
    PCascadeSelectModule,
    ConfigHandlerModule,
    AddonModule,
    LabelStarModule,
    CommonModule,
    FormsModule
  ],
  exports: [CascadeSelectComponent]
})
export class CascadeSelectModule {
}

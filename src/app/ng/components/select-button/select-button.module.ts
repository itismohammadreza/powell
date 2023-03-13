import {NgModule} from "@angular/core";
import {SelectButtonModule as PSelectButtonModule} from 'primeng/selectbutton';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {SelectButtonComponent} from "@ng/components/select-button";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [SelectButtonComponent],
  imports: [PSelectButtonModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [SelectButtonComponent]
})
export class SelectButtonModule {
}

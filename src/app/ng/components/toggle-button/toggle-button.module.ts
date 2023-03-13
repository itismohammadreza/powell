import {NgModule} from "@angular/core";
import {ToggleButtonModule as PToggleButtonModule} from 'primeng/togglebutton';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {ToggleButtonComponent} from "@ng/components/toggle-button";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [ToggleButtonComponent],
  imports: [PToggleButtonModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [ToggleButtonComponent]
})

export class ToggleButtonModule {
}

import {NgModule} from "@angular/core";
import {RadioButtonModule} from 'primeng/radiobutton';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {RadioComponent} from "@ng/components/radio";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [RadioComponent],
  imports: [RadioButtonModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [RadioComponent]
})
export class RadioModule {
}

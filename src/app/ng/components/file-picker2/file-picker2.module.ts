import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {FilePicker2Component} from "@ng/components/file-picker2";
import {LabelStarModule} from "@ng/pipes/label-star";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [FilePicker2Component],
  imports: [ConfigHandlerModule, ButtonModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [FilePicker2Component]
})
export class FilePicker2Module {
}

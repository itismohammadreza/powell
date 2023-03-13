import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {EditorBaseComponent, EditorComponent} from "@ng/components/editor";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [EditorComponent, EditorBaseComponent],
  imports: [ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [EditorComponent]
})
export class EditorModule {
}

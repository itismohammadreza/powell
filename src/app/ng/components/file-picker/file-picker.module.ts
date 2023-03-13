import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {FilePickerComponent} from "@ng/components/file-picker";
import {FileUploadModule} from "primeng/fileupload";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [FilePickerComponent],
  imports: [FileUploadModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [FilePickerComponent]
})

export class FilePickerModule {
}

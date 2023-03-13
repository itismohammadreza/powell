import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FileUploadModule} from "primeng/fileupload";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {FilePickerComponent} from "@ng/components/file-picker";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [FilePickerComponent],
  imports: [
    FileUploadModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule
  ],
  exports: [FilePickerComponent]
})

export class FilePickerModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {FilePickerComponent} from "@ng/components/file-picker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeFileUploadModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [FilePickerComponent],
  exports: [FilePickerComponent, TemplateModule],
  imports: [
    PrimeFileUploadModule,
    ConfigHandlerModule,
    LabelStarModule,
    CommonModule
  ],
})

export class FilePickerModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilePickerComponent} from "@powell/components/file-picker";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeFileUploadModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [FilePickerComponent],
  exports: [FilePickerComponent, TemplateModule],
  imports: [
    PrimeFileUploadModule,
    LabelStarModule,
    CommonModule,
    ConfigHandlerModule
  ],
})

export class FilePickerModule {
}

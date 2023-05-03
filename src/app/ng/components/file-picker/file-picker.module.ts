import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilePickerComponent} from "@ng/components/file-picker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeFileUploadModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [FilePickerComponent],
  exports: [FilePickerComponent, TemplateModule],
  imports: [
    PrimeFileUploadModule,
    LabelStarModule,
    CommonModule
  ],
})

export class FilePickerModule {
}

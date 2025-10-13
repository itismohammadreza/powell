import {NgModule} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import {FilePickerComponent} from "@powell/components/file-picker";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$FileUploadModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [FilePickerComponent],
  exports: [FilePickerComponent, TemplateModule],
  imports: [
    $FileUploadModule,
    LabelStarModule,
    NgTemplateOutlet,
    FormFieldModule
  ],
})

export class FilePickerModule {
}

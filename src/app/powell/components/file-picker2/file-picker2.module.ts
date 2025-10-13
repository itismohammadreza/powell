import {NgModule} from "@angular/core";
import {FilePicker2Component} from "@powell/components/file-picker2";
import {LabelStarModule} from "@powell/pipes/label-star";
import {ButtonModule} from "@powell/components/button";
import {$PlusIcon, $TrashIcon, $UploadIcon} from "@powell/primeng";
import {FormFieldModule} from "@powell/components/form-field";

@NgModule({
  declarations: [FilePicker2Component],
  exports: [FilePicker2Component],
  imports: [
    ButtonModule,
    LabelStarModule,
    $UploadIcon,
    $PlusIcon,
    $TrashIcon,
    FormFieldModule,
  ],
})
export class FilePicker2Module {
}

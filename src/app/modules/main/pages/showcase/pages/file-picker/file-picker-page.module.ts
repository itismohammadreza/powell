import {NgModule} from "@angular/core";
import {FilePickerModule} from "@powell/components/file-picker";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FilePickerPage} from "@modules/main/pages/showcase/pages/file-picker";

@NgModule({
  declarations: [FilePickerPage],
  imports: [
    FilePickerModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: FilePickerPage}])
  ]
})

export class FilePickerPageModule {
}

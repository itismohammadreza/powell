import {NgModule} from "@angular/core";
import {FilePicker2Module} from "@powell/components/file-picker2";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FilePicker2Page} from "@modules/main/pages/showcase/pages/file-picker2";

@NgModule({
  declarations: [FilePicker2Page],
  imports: [
    FilePicker2Module,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: FilePicker2Page}])
  ],
})
export class FilePicker2PageModule {
}

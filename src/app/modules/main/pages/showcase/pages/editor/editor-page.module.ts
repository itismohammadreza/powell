import {NgModule} from "@angular/core";
import {EditorModule} from "@powell/components/editor";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {EditorPage} from "@modules/main/pages/showcase/pages/editor";

@NgModule({
  declarations: [EditorPage],
  imports: [
    EditorModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: EditorPage}])
  ]
})
export class EditorPageModule {
}

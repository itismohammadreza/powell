import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TreeSelectModule} from "@powell/components/tree-select";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {TreeSelectPage} from "@modules/main/pages/showcase/pages/tree-select";

@NgModule({
  declarations: [TreeSelectPage],
  imports: [
    TreeSelectModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: TreeSelectPage}])
  ],
})
export class TreeSelectPageModule {
}

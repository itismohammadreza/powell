import {NgModule} from "@angular/core";
import {TreeModule} from "@powell/components/tree";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {TreePage} from "@modules/main/pages/showcase/pages/tree";

@NgModule({
  declarations: [TreePage],
  imports: [
    TreeModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: TreePage}])
  ],
})
export class TreePageModule {
}

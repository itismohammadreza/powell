import {NgModule} from "@angular/core";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {UtilsPage} from "@modules/main/pages/showcase/pages/utils";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [UtilsPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: UtilsPage}])
  ],
})
export class UtilsPageModule {
}

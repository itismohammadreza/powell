import {NgModule} from "@angular/core";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {DynamicDialogSampleComponent, UtilsPage} from "@modules/main/pages/showcase/pages/utils";
import {ButtonModule} from "@ng/components/button";
import {DynamicDialogModule} from "@ng/components/dynamic-dialog";

@NgModule({
  declarations: [UtilsPage, DynamicDialogSampleComponent],
  imports: [
    ButtonModule,
    DynamicDialogModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: UtilsPage}])
  ],
})
export class UtilsPageModule {
}
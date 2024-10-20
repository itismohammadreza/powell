import {NgModule} from "@angular/core";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {DynamicDialogSampleComponent, UtilsPage} from "@modules/main/pages/showcase/pages/utils";
import {ButtonModule} from "@powell/components/button";
import {InputNumberModule} from "@powell/components/input-number";

@NgModule({
  declarations: [UtilsPage, DynamicDialogSampleComponent],
  imports: [
    ButtonModule,
    InputNumberModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: UtilsPage}])
  ],
})
export class UtilsPageModule {
}

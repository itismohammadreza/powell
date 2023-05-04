import {NgModule} from "@angular/core";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {DynamicDialogSampleComponent, UtilsPage} from "@modules/main/pages/showcase/pages/utils";
import {ButtonModule} from "@powell/components/button";
import {DynamicDialogModule} from "@powell/components/dynamic-dialog";
import {OverlayModule} from "@powell/components/overlay";
import {InputNumberModule} from "@powell/components/input-number";

@NgModule({
  declarations: [UtilsPage, DynamicDialogSampleComponent],
  imports: [
    ButtonModule,
    DynamicDialogModule,
    OverlayModule,
    InputNumberModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: UtilsPage}])
  ],
})
export class UtilsPageModule {
}

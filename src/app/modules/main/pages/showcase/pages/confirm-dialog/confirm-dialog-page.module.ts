import {NgModule} from '@angular/core';
import {ConfirmDialogPage} from "@modules/main/pages/showcase/pages/confirm-dialog";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {OverlayModule} from "@ng/components/overlay";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [ConfirmDialogPage],
  imports: [
    OverlayModule,
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ConfirmDialogPage}])],
})
export class ConfirmDialogPageModule {
}

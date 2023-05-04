import {NgModule} from '@angular/core';
import {ConfirmDialogPage} from "@modules/main/pages/showcase/pages/confirm-dialog";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "@powell/components/button";

@NgModule({
  declarations: [ConfirmDialogPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ConfirmDialogPage}])],
})
export class ConfirmDialogPageModule {
}

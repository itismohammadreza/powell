import {NgModule} from '@angular/core';
import {ConfirmPopupPage} from "@modules/main/pages/showcase/pages/confirm-popup";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "@powell/components/button";

@NgModule({
  declarations: [ConfirmPopupPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ConfirmPopupPage}])
  ],
})
export class ConfirmPopupPageModule {
}

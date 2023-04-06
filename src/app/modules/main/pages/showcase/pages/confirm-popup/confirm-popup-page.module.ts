import {NgModule} from '@angular/core';
import {ConfirmPopupPage} from "@modules/main/pages/showcase/pages/confirm-popup";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {OverlayModule} from "@ng/components/overlay";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [ConfirmPopupPage],
  imports: [
    OverlayModule,
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ConfirmPopupPage}])
  ],
})
export class ConfirmPopupPageModule {
}

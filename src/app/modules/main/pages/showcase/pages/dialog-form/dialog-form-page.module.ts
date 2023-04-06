import {NgModule} from '@angular/core';
import {DialogFormPage} from "@modules/main/pages/showcase/pages/dialog-form";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {OverlayModule} from "@ng/components/overlay";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [DialogFormPage],
  imports: [
    OverlayModule,
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: DialogFormPage}])
  ],
})
export class DialogFormPageModule {
}

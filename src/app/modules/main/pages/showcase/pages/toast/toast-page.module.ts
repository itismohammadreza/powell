import {NgModule} from '@angular/core';
import {ToastPage} from '@modules/main/pages/showcase/pages/toast';
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {OverlayModule} from "@ng/components/overlay";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [ToastPage],
  imports: [
    OverlayModule,
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ToastPage}])
  ],
})
export class ToastPageModule {
}
import {NgModule} from '@angular/core';
import {ToastPage} from '@modules/main/pages/showcase/pages/toast';
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "@powell/components/button";

@NgModule({
  declarations: [ToastPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ToastPage}])
  ],
})
export class ToastPageModule {
}

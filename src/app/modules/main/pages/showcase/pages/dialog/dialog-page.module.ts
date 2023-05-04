import {NgModule} from '@angular/core';
import {DialogPage} from "@modules/main/pages/showcase/pages/dialog";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "@powell/components/button";

@NgModule({
  declarations: [DialogPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: DialogPage}])
  ],
})
export class DialogPageModule {
}

import {NgModule} from '@angular/core';
import {DialogFormPage} from "@modules/main/pages/showcase/pages/dialog-form";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "@powell/components/button";

@NgModule({
  declarations: [DialogFormPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: DialogFormPage}])
  ],
})
export class DialogFormPageModule {
}

import {NgModule} from "@angular/core";
import {EmptyModule} from "@powell/components/empty";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {EmptyPage} from "@modules/main/pages/showcase/pages/empty";

@NgModule({
  declarations: [EmptyPage],
  imports: [
    EmptyModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: EmptyPage}])
  ],
})
export class EmptyPageModule {
}

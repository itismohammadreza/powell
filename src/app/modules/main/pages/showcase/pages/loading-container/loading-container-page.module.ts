import {NgModule} from "@angular/core";
import {LoadingContainerModule} from "@powell/components/loading-container";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {LoadingContainerPage} from "@modules/main/pages/showcase/pages/loading-container";

@NgModule({
  declarations: [LoadingContainerPage],
  imports: [
    LoadingContainerModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: LoadingContainerPage}])
  ],
})
export class LoadingContainerPageModule {
}

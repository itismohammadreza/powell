import {NgModule} from "@angular/core";
import {SplitButtonModule} from "@powell/components/split-button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {SplitButtonPage} from "@modules/main/pages/showcase/pages/split-button";

@NgModule({
  declarations: [SplitButtonPage],
  imports: [
    SplitButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: SplitButtonPage}])
  ],
})
export class SplitButtonPageModule {
}

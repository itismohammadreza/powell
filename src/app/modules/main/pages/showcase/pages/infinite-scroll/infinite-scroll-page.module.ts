import {NgModule} from "@angular/core";
import {InfiniteScrollModule} from "@powell/components/infinite-scroll";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {InfiniteScrollPage} from "@modules/main/pages/showcase/pages/infinite-scroll";

@NgModule({
  declarations: [InfiniteScrollPage],
  imports: [
    InfiniteScrollModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: InfiniteScrollPage}])
  ],
})
export class InfiniteScrollPageModule {
}

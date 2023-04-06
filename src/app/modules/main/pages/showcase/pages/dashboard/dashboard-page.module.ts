import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {DashboardPage} from "@modules/main/pages/showcase/pages/dashboard";

@NgModule({
  declarations: [DashboardPage],
  imports: [
    RouterModule.forChild([{path: '', component: DashboardPage}])
  ]
})
export class DashboardPageModule {
}

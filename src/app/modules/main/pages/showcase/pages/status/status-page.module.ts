import {NgModule} from "@angular/core";
import {StatusModule} from "@powell/components/status";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {StatusPage} from "@modules/main/pages/showcase/pages/status";

@NgModule({
  declarations: [StatusPage],
  imports: [
    StatusModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: StatusPage}])
  ],
})
export class StatusPageModule {
}

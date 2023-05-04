import {NgModule} from "@angular/core";
import {MessageModule} from "@powell/components/message";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {MessagePage} from "@modules/main/pages/showcase/pages/message";

@NgModule({
  declarations: [MessagePage],
  imports: [
    MessageModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: MessagePage}])
  ],
})
export class MessagePageModule {
}

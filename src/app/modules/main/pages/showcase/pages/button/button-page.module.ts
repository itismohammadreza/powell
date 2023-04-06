import {NgModule} from "@angular/core";
import {ButtonModule} from "@ng/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ButtonPage} from "@modules/main/pages/showcase/pages/button";

@NgModule({
  declarations: [ButtonPage],
  imports: [
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: ButtonPage}])
  ]
})
export class ButtonPageModule {
}

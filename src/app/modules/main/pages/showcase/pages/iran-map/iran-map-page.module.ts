import {NgModule} from "@angular/core";
import {IranMapModule} from "@powell/components/iran-map";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {IranMapPage} from "@modules/main/pages/showcase/pages/iran-map";

@NgModule({
  declarations: [IranMapPage],
  imports: [
    IranMapModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: IranMapPage}])
  ],
})
export class IranMapPageModule {
}

import {NgModule} from "@angular/core";
import {MapModule} from "@powell/components/map";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {MapPage} from "@modules/main/pages/showcase/pages/map";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [MapPage],
  imports: [
    MapModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: MapPage}])
  ],
})
export class MapPageModule {
}

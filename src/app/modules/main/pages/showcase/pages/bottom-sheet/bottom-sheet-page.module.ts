import {NgModule} from '@angular/core';
import {BottomSheetPage} from "@modules/main/pages/showcase/pages/bottom-sheet";
import {BottomSheetModule} from "@ng/components/bottom-sheet";
import {ButtonModule} from "@ng/components/button";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [BottomSheetPage],
  imports: [
    BottomSheetModule,
    ButtonModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: BottomSheetPage}])
  ]
})
export class BottomSheetPageModule {
}

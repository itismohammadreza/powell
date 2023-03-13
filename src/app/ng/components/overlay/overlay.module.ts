import {NgModule} from '@angular/core';
import {Dialog2Component, DialogComponent, DialogFormComponent} from '.';
import {OverlayService} from "@ng/services";

@NgModule({
  declarations: [DialogComponent, DialogFormComponent, Dialog2Component],
  exports: [DialogComponent, DialogFormComponent, Dialog2Component],
  providers: [OverlayService]
})
export class OverlayModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BottomSheetComponent} from "@ng/components/bottom-sheet";
import {ButtonModule} from "@ng/components/button";
import {PrimeSidebarModule} from "@ng/primeng";
import {TemplateModule} from "@ng/directives/template";

@NgModule({
  declarations: [BottomSheetComponent],
  exports: [BottomSheetComponent, TemplateModule],
  imports: [
    PrimeSidebarModule,
    ButtonModule,
    CommonModule
  ],
})
export class BottomSheetModule {
}

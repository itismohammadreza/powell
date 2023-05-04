import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BottomSheetComponent} from "@powell/components/bottom-sheet";
import {ButtonModule} from "@powell/components/button";
import {PrimeSidebarModule} from "@powell/primeng";
import {TemplateModule} from "@powell/directives/template";

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

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {BottomSheetComponent} from "@ng/components/bottom-sheet";
import {ButtonModule} from "@ng/components/button";

@NgModule({
  declarations: [BottomSheetComponent],
  imports: [SidebarModule, ButtonModule, CommonModule],
  exports: [BottomSheetComponent]
})
export class BottomSheetModule {
}

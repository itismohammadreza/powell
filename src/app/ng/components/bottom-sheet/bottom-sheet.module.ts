import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BottomSheetComponent} from "@ng/components/bottom-sheet";
import {SidebarModule} from "primeng/sidebar";

@NgModule({
  declarations: [BottomSheetComponent],
  imports: [SidebarModule, CommonModule],
  exports: [BottomSheetComponent]
})
export class BottomSheetModule {
}

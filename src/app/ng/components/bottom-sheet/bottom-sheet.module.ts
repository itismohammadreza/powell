import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {BottomSheetComponent} from "@ng/components/bottom-sheet";

@NgModule({
  declarations: [BottomSheetComponent],
  imports: [SidebarModule, CommonModule],
  exports: [BottomSheetComponent]
})
export class BottomSheetModule {
}

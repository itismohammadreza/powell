import {NgModule} from '@angular/core';
import {Sidebar, SidebarModule} from "primeng/sidebar";

@NgModule({
  exports: [SidebarModule]
})
export class PrimeSidebarModule {
}

export const PrimeSidebar = Sidebar;
export type PrimeSidebar = Sidebar;

import {NgModule} from '@angular/core';
import {Dock, DockModule} from "primeng/dock";

@NgModule({
  exports: [DockModule]
})
export class PrimeDockModule {
}

export const PrimeDock = Dock;
export type PrimeDock = Dock;

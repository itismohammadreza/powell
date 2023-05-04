import {NgModule} from '@angular/core';
import {Divider, DividerModule} from "primeng/divider";

@NgModule({
  exports: [DividerModule]
})
export class PrimeDividerModule {
}

export const PrimeDivider = Divider;
export type PrimeDivider = Divider;

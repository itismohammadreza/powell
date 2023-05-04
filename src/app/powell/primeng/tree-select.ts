import {NgModule} from '@angular/core';
import {TreeSelect, TreeSelectModule} from "primeng/treeselect";

@NgModule({
  exports: [TreeSelectModule]
})
export class PrimeTreeSelectModule {
}

export const PrimeTreeSelect = TreeSelect;
export type PrimeTreeSelect = TreeSelect;

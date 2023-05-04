import {NgModule} from '@angular/core';
import {TreeTable, TreeTableModule} from "primeng/treetable";

@NgModule({
  exports: [TreeTableModule]
})
export class PrimeTreeTableModule {
}

export const PrimeTreeTable = TreeTable;
export type PrimeTreeTable = TreeTable;

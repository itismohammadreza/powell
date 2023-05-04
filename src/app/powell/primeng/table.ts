import {NgModule} from '@angular/core';
import {Table, TableModule} from "primeng/table";

@NgModule({
  exports: [TableModule]
})
export class PrimeTableModule {
}

export const PrimeTable = Table;
export type PrimeTable = Table;

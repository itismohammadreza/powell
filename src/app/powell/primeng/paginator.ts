import {NgModule} from '@angular/core';
import {Paginator, PaginatorModule} from "primeng/paginator";

@NgModule({
  exports: [PaginatorModule]
})
export class PrimePaginatorModule {
}

export const PrimePaginator = Paginator;
export type PrimePaginator = Paginator;

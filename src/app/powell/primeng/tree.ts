import {NgModule} from '@angular/core';
import {Tree, TreeModule} from "primeng/tree";

@NgModule({
  exports: [TreeModule]
})
export class PrimeTreeModule {
}

export const PrimeTree = Tree;
export type PrimeTree = Tree;

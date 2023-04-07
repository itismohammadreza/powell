import {NgModule} from '@angular/core';
import {Tag, TagModule} from "primeng/tag";

@NgModule({
  exports: [TagModule]
})
export class PrimeTagModule {
}

export const PrimeTag = Tag;
export type PrimeTag = Tag;

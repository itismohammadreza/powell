import {NgModule} from '@angular/core';
import {StyleClass, StyleClassModule} from "primeng/styleclass";

@NgModule({
  exports: [StyleClassModule]
})
export class PrimeStyleClassModule {
}

export const PrimeStyleClass = StyleClass;
export type PrimeStyleClass = StyleClass;

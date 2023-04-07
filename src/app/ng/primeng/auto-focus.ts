import {NgModule} from '@angular/core';
import {AutoFocus, AutoFocusModule} from "primeng/autofocus";

@NgModule({
  exports: [AutoFocusModule]
})
export class PrimeAutoFocusModule {
}

export const PrimeAutoFocus = AutoFocus;
export type PrimeAutoFocus = AutoFocus;

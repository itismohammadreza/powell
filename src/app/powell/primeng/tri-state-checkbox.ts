import {NgModule} from '@angular/core';
import {TriStateCheckbox, TriStateCheckboxModule} from "primeng/tristatecheckbox";

@NgModule({
  exports: [TriStateCheckboxModule]
})
export class PrimeTriStateCheckboxModule {
}

export const PrimeTriStateCheckbox = TriStateCheckbox;
export type PrimeTriStateCheckbox = TriStateCheckbox;

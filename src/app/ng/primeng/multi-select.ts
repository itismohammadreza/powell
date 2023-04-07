import {NgModule} from '@angular/core';
import {MultiSelect, MultiSelectModule} from "primeng/multiselect";

@NgModule({
  exports: [MultiSelectModule]
})
export class PrimeMultiSelectModule {
}

export const PrimeMultiSelect = MultiSelect;

import {NgModule} from '@angular/core';
import {Dropdown, DropdownModule} from "primeng/dropdown";

@NgModule({
  exports: [DropdownModule]
})
export class PrimeDropdownModule {
}

export const PrimeDropdown = Dropdown;
export type PrimeDropdown = Dropdown;

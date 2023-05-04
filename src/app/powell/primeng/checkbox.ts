import {NgModule} from '@angular/core';
import {Checkbox, CheckboxModule} from "primeng/checkbox";

@NgModule({
  exports: [CheckboxModule]
})
export class PrimeCheckboxModule {
}

export const PrimeCheckbox = Checkbox;
export type PrimeCheckbox = Checkbox;

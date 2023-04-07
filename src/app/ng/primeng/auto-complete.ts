import {NgModule} from '@angular/core';
import {AutoComplete, AutoCompleteModule} from "primeng/autocomplete";

@NgModule({
  exports: [AutoCompleteModule]
})
export class PrimeAutoCompleteModule {
}

export const PrimeAutoComplete = AutoComplete;
export type PrimeAutoComplete = AutoComplete;

import {NgModule} from '@angular/core';
import {Listbox, ListboxModule} from "primeng/listbox";

@NgModule({
  exports: [ListboxModule]
})
export class PrimeListboxModule {
}

export const PrimeListbox = Listbox;

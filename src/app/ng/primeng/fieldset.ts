import {NgModule} from '@angular/core';
import {Fieldset, FieldsetModule} from "primeng/fieldset";

@NgModule({
  exports: [FieldsetModule]
})
export class PrimeFieldsetModule {
}

export const PrimeFieldset = Fieldset;

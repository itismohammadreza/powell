import {NgModule} from '@angular/core';
import {Inplace, InplaceModule} from "primeng/inplace";

@NgModule({
  exports: [InplaceModule]
})
export class PrimeInplaceModule {
}

export const PrimeInplace = Inplace;

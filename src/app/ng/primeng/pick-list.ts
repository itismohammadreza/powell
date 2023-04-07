import {NgModule} from '@angular/core';
import {PickList, PickListModule} from "primeng/picklist";

@NgModule({
  exports: [PickListModule]
})
export class PrimePickListModule {
}

export const PrimePickList = PickList;

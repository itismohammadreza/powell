import {NgModule} from '@angular/core';
import {DataView, DataViewModule} from "primeng/dataview";

@NgModule({
  exports: [DataViewModule]
})
export class PrimeDataViewModule {
}

export const PrimeDataView = DataView;

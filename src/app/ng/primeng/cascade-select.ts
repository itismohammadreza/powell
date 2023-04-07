import {NgModule} from '@angular/core';
import {CascadeSelect, CascadeSelectModule} from "primeng/cascadeselect";

@NgModule({
  exports: [CascadeSelectModule]
})
export class PrimeCascadeSelectModule {
}

export const PrimeCascadeSelect = CascadeSelect;

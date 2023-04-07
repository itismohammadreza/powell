import {NgModule} from '@angular/core';
import {FocusTrap, FocusTrapModule} from "primeng/focustrap";

@NgModule({
  exports: [FocusTrapModule]
})
export class PrimeFocusTrapModule {
}

export const PrimeFocusTrap = FocusTrap;
export type PrimeFocusTrap = FocusTrap;

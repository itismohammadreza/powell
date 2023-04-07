import {NgModule} from '@angular/core';
import {ConfirmPopup, ConfirmPopupModule} from "primeng/confirmpopup";

@NgModule({
  exports: [ConfirmPopupModule]
})
export class PrimeConfirmPopupModule {
}

export const PrimeConfirmPopup = ConfirmPopup;
export type PrimeConfirmPopup = ConfirmPopup;

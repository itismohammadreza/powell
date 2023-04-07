import {NgModule} from '@angular/core';
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  exports: [ConfirmDialogModule]
})
export class PrimeConfirmDialogModule {
}

export const PrimeConfirmDialog = ConfirmDialog;

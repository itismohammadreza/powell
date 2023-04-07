import {NgModule} from '@angular/core';
import {Dialog, DialogModule} from "primeng/dialog";

@NgModule({
  exports: [DialogModule]
})
export class PrimeDialogModule {
}

export const PrimeDialog = Dialog;

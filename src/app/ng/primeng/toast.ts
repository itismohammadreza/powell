import {NgModule} from '@angular/core';
import {Toast, ToastModule} from "primeng/toast";

@NgModule({
  exports: [ToastModule]
})
export class PrimeToastModule {
}

export const PrimeToast = Toast;
export type PrimeToast = Toast;

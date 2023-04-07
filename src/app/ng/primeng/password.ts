import {NgModule} from '@angular/core';
import {Password, PasswordModule} from "primeng/password";

@NgModule({
  exports: [PasswordModule]
})
export class PrimePasswordModule {
}

export const PrimePassword = Password;
export type PrimePassword = Password;

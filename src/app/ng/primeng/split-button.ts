import {NgModule} from '@angular/core';
import {SplitButton, SplitButtonModule} from "primeng/splitbutton";

@NgModule({
  exports: [SplitButtonModule]
})
export class PrimeSplitButtonModule {
}

export const PrimeSplitButton = SplitButton;
export type PrimeSplitButton = SplitButton;

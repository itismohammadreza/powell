import {NgModule} from '@angular/core';
import {InputTextarea, InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
  exports: [InputTextareaModule]
})
export class PrimeInputTextareaModule {
}

export const PrimeInputTextarea = InputTextarea;
export type PrimeInputTextarea = InputTextarea;

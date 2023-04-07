import {NgModule} from '@angular/core';
import {Editor, EditorModule} from "primeng/editor";

@NgModule({
  exports: [EditorModule]
})
export class PrimeEditorModule {
}

export const PrimeEditor = Editor;
export type PrimeEditor = Editor;

import {NgModule} from '@angular/core';
import {Splitter, SplitterModule} from "primeng/splitter";

@NgModule({
  exports: [SplitterModule]
})
export class PrimeSplitterModule {
}

export const PrimeSplitter = Splitter;

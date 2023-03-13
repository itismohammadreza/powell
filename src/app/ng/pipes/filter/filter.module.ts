import {NgModule} from '@angular/core';
import {FilterPipe} from "@ng/pipes/filter";

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe]
})
export class FilterModule {
}

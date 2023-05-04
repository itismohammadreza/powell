import {NgModule} from '@angular/core';
import {FilterPipe} from "@powell/pipes/filter";

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe]
})
export class FilterModule {
}

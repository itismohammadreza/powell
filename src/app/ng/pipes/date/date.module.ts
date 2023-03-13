import {NgModule} from '@angular/core';
import {DatePipe} from "@ng/pipes/date";

@NgModule({
  declarations: [DatePipe],
  exports: [DatePipe]
})
export class DateModule {
}

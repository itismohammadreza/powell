import {NgModule} from '@angular/core';
import {DatePipe} from "@powell/pipes/date";

@NgModule({
  declarations: [DatePipe],
  exports: [DatePipe]
})
export class DateModule {
}

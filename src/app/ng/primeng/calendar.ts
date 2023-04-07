import {NgModule} from '@angular/core';
import {Calendar, CalendarModule} from "primeng/calendar";

@NgModule({
  exports: [CalendarModule]
})
export class PrimeCalendarModule {
}

export const PrimeCalendar = Calendar;
export type PrimeCalendar = Calendar;

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {$CalendarModule} from "@powell/primeng";
import {DatepickerComponent} from "@powell/components/datepicker/datepicker.component";
import {
  $ChevronLeftIcon,
  $ChevronRightIcon,
  $ChevronUpIcon,
  $ChevronDownIcon,
  $TimesIcon,
  $CalendarIcon,
} from '@powell/primeng/icons';

@NgModule({
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent],
  imports: [
    $CalendarModule,
    CommonModule,
    FormsModule,
    $ChevronLeftIcon,
    $ChevronRightIcon,
    $ChevronUpIcon,
    $ChevronDownIcon,
    $TimesIcon,
    $CalendarIcon,
  ],
})
export class DatepickerModule {
}

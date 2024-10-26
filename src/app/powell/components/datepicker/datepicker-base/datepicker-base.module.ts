import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {$CalendarModule} from "@powell/primeng";
import {
  $CalendarIcon,
  $ChevronDownIcon,
  $ChevronLeftIcon,
  $ChevronRightIcon,
  $ChevronUpIcon,
  $TimesIcon,
} from '@powell/primeng/icons';
import {DatepickerBaseComponent} from "@powell/components/datepicker/datepicker-base/datepicker-base.component";

@NgModule({
  declarations: [DatepickerBaseComponent],
  exports: [DatepickerBaseComponent],
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
export class DatepickerBaseModule {
}

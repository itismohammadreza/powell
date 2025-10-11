import {NgModule} from "@angular/core";
import {CommonModule, NgClass, NgStyle, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  $AutoFocus,
  $AutoFocusModule,
  $Button,
  $ButtonModule,
  $DatePickerModule,
  $InputText,
  $InputTextModule,
  $Ripple,
  $RippleModule,
  $SharedModule
} from "@powell/primeng";
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
    $DatePickerModule,
    $ButtonModule,
    $RippleModule,
    $AutoFocusModule,
    $InputTextModule,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FormsModule,
    $ChevronLeftIcon,
    $ChevronRightIcon,
    $ChevronUpIcon,
    $ChevronDownIcon,
    $TimesIcon,
    $CalendarIcon,

    CommonModule,
    $Button,
    $Ripple,
    $AutoFocus,
    $InputText,
    $SharedModule
  ],
})
export class DatepickerBaseModule {
}

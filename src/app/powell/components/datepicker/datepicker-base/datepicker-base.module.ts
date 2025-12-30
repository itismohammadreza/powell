import {NgModule} from "@angular/core";
import {CommonModule, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  $AutoFocus,
  $AutoFocusModule,
  $BindModule,
  $Button,
  $ButtonModule,
  $CalendarIcon,
  $ChevronDownIcon,
  $ChevronLeftIcon,
  $ChevronRightIcon,
  $ChevronUpIcon,
  $DatePickerModule,
  $InputText,
  $InputTextModule,
  $MotionModule,
  $Ripple,
  $RippleModule,
  $SharedModule,
  $TimesIcon
} from "@powell/primeng";
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
    NgTemplateOutlet,
    FormsModule,
    $ChevronLeftIcon,
    $ChevronRightIcon,
    $ChevronUpIcon,
    $ChevronDownIcon,
    $TimesIcon,
    $CalendarIcon,
    $BindModule,
    $MotionModule,
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

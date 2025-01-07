import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LabelStarModule} from "@powell/pipes/label-star";
import {DatepickerBaseModule} from "@powell/components/datepicker/datepicker-base";
import {DatepickerComponent} from "@powell/components/datepicker/datepicker.component";
import {ElementAdditionsModule} from "@powell/components/element-additions";

@NgModule({
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent],
  imports: [
    DatepickerBaseModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ElementAdditionsModule,
  ],
})
export class DatepickerModule {
}

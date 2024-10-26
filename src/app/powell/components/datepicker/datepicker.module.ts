import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {LabelStarModule} from "@powell/pipes/label-star";
import {DatepickerBaseModule} from "@powell/components/datepicker/datepicker-base";
import {DatepickerComponent} from "@powell/components/datepicker/datepicker.component";

@NgModule({
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent],
  imports: [
    DatepickerBaseModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class DatepickerModule {
}

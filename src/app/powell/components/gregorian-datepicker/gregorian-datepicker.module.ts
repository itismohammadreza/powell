import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {GregorianDatepickerComponent} from "@powell/components/gregorian-datepicker";
import {LabelStarModule} from "@powell/pipes/label-star";
import {$CalendarModule} from "@powell/primeng";

@NgModule({
  declarations: [GregorianDatepickerComponent],
  exports: [GregorianDatepickerComponent],
  imports: [
    $CalendarModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule
  ],
})
export class GregorianDatepickerModule {
}

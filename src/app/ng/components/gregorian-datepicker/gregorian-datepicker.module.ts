import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {GregorianDatepickerComponent} from "@ng/components/gregorian-datepicker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeCalendarModule} from "@ng/primeng";

@NgModule({
  declarations: [GregorianDatepickerComponent],
  exports: [GregorianDatepickerComponent],
  imports: [
    PrimeCalendarModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    ConfigHandlerModule,
    AddonModule,
  ],
})
export class GregorianDatepickerModule {
}

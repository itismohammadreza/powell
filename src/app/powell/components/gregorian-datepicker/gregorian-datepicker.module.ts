import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@powell/directives/addon";
import {GregorianDatepickerComponent} from "@powell/components/gregorian-datepicker";
import {LabelStarModule} from "@powell/pipes/label-star";
import {PrimeCalendarModule} from "@powell/primeng";
import {ConfigHandlerModule} from "@powell/directives/config-handler";

@NgModule({
  declarations: [GregorianDatepickerComponent],
  exports: [GregorianDatepickerComponent],
  imports: [
    PrimeCalendarModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
    ConfigHandlerModule
  ],
})
export class GregorianDatepickerModule {
}

import {NgModule} from "@angular/core";
import {CalendarModule} from 'primeng/calendar';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {AddonModule} from "@ng/directives/addon";
import {GregorianDatepickerComponent} from "@ng/components/gregorian-datepicker";
import {LabelStarModule} from "@ng/pipes/label-star";

@NgModule({
  declarations: [GregorianDatepickerComponent],
  imports: [CalendarModule, ConfigHandlerModule, AddonModule, LabelStarModule, CommonModule, FormsModule],
  exports: [GregorianDatepickerComponent]
})
export class GregorianDatepickerModule {
}

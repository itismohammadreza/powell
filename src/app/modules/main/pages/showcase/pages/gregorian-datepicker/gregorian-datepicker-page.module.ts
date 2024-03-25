import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {GregorianDatepickerModule} from "@powell/components/gregorian-datepicker";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {GregorianDatepickerPage} from "@modules/main/pages/showcase/pages/gregorian-datepicker";
// import {DatePickerBaseModule} from "@powell/components/jalali-datepicker/date-picker-base/date-picker-base.module";

@NgModule({
  declarations: [GregorianDatepickerPage],
  imports: [
    GregorianDatepickerModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: GregorianDatepickerPage}]),
    // DatePickerBaseModule,
  ],
})
export class GregorianDatepickerPageModule {
}

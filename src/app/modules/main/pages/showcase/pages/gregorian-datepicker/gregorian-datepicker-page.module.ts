import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {GregorianDatepickerModule} from "@ng/components/gregorian-datepicker";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {GregorianDatepickerPage} from "@modules/main/pages/showcase/pages/gregorian-datepicker";

@NgModule({
  declarations: [GregorianDatepickerPage],
  imports: [
    GregorianDatepickerModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: GregorianDatepickerPage}])
  ],
})
export class GregorianDatepickerPageModule {
}

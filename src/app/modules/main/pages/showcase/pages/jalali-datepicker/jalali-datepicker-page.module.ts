import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {JalaliDatepickerModule} from "@powell/components/jalali-datepicker";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {RouterModule} from "@angular/router";
import {JalaliDatepickerPage} from "@modules/main/pages/showcase/pages/jalali-datepicker";

@NgModule({
  declarations: [JalaliDatepickerPage],
  imports: [
    JalaliDatepickerModule,
    ReactiveFormsModule,
    ExtrasModule,
    RouterModule.forChild([{path: '', component: JalaliDatepickerPage}])
  ],
})
export class JalaliDatepickerPageModule {
}

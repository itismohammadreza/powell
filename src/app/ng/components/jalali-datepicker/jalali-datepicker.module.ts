import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddonModule} from "@ng/directives/addon";
import {JalaliDatepickerComponent, JalaliPickerBaseComponent} from "@ng/components/jalali-datepicker";
import {LabelStarModule} from "@ng/pipes/label-star";
import {PrimeButtonModule, PrimeRippleModule} from "@ng/primeng";

@NgModule({
  declarations: [JalaliDatepickerComponent, JalaliPickerBaseComponent],
  exports: [JalaliDatepickerComponent],
  imports: [
    PrimeButtonModule,
    PrimeRippleModule,
    CommonModule,
    FormsModule,
    LabelStarModule,
    AddonModule,
  ],
})
export class JalaliDatepickerModule {
}
